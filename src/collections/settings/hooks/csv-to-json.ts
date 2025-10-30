import { randomInt } from 'node:crypto'
import csv from 'csvtojson'
import { err, fromPromise, ok, ResultAsync } from 'neverthrow'
import type { FieldHook, JsonArray } from 'payload'
import * as R from 'remeda'
import { generator as passwordGenerator } from 'ts-password-generator'
import { uniqueNamesGenerator as nameGenerator, names } from 'unique-names-generator'
import type { Account } from '@/collections/orders/hooks/create-browser-job'

class FileFindError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'FileFindError'
  }
}
class FileFetchError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'FileFetchError'
  }
}
class CsvParseError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CsvParseError'
  }
}

const parseCsvToAccounts = (csvDataString: string): ResultAsync<JsonArray, CsvParseError> => {
  const parserPromise = csv({
    delimiter: '/',
    checkType: true,
    colParser: {
      email: 'string',
      card: 'number',
      cvc: 'number',
      zip: 'number',
      exp: 'string',
    },
  }).fromString(csvDataString)

  return fromPromise(parserPromise, (error) => new CsvParseError((error as Error).message)).map(
    R.map((account: Account) => {
      const first = nameGenerator({ dictionaries: [names] })
      const last = nameGenerator({ dictionaries: [names] })
      const pass = passwordGenerator({
        haveNumbers: true,
        haveString: true,
        haveSymbols: true,
        charsQty: randomInt(12, 20),
      })
      return {
        ...account,
        first: account.first ?? first,
        last: account.last ?? last,
        pass: account.pass ?? pass,
        status: account.status ?? 'available',
      }
    })
  )
}

export const csvToJson: FieldHook = async ({ siblingData, req, value, previousValue }) => {
  if (value && value !== previousValue) {
    const processingResult = await ResultAsync.fromPromise(
      req.payload.findByID({
        overrideAccess: true,
        collection: 'files',
        id: value,
      }),
      (e) => new FileFindError((e as Error).message)
    )
      .andThen((csvDocument) => {
        if (csvDocument?.url) {
          return ok(csvDocument.url as string)
        }
        return err(new FileFindError('Uploaded document or URL not found.'))
      })
      .andThen((url) => {
        return fromPromise(
          fetch(url, {
            headers: {
              cookie: req.headers.get('cookie') ?? '',
            },
          }),
          (e) => new FileFetchError((e as Error).message)
        )
      })
      .andThen((response) => {
        if (response.ok) {
          return fromPromise(response.text(), (e) => new FileFetchError((e as Error).message))
        }
        return err(new FileFetchError(`Failed to fetch file: ${response.statusText}`))
      })
      .andThen(parseCsvToAccounts)
    processingResult.match(
      (accountData) => {
        siblingData.accountData = accountData
      },
      (error) => {
        req.payload.logger.error(`Error processing CSV: ${error.name} - ${error.message}`)
        throw new Error(`Failed to process CSV: ${error.message}`)
      }
    )
  }
}
