import csv from 'csvtojson'
import type { JsonArray } from 'payload'

export const csvToJson = async (csvDataString: string) => {
  if (!csvDataString) {
    return []
  }

  try {
    const jsonArray: JsonArray = await csv({
      delimiter: '/',
    }).fromString(csvDataString)

    return jsonArray
  } catch (error) {
    console.error('Error parsing CSV string:', error)
    return []
  }
}
