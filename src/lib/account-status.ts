import type { Payload } from 'payload'
import type { Setting as Settings } from '@/payload-types'

export const updateAccountStatus = async (
  payload: Payload,
  accountEmail: string,
  newStatus: 'available' | 'in-use' | 'error' | 'used'
) => {
  try {
    const settings = (await payload.findGlobal({
      slug: 'settings',
    })) as Settings
    const accountData = settings.accountData as any[] | null
    if (!accountData) return

    let accountUpdated = false
    const updatedAccountData = accountData.map((acc) => {
      if (acc.email === accountEmail) {
        accountUpdated = true
        return { ...acc, status: newStatus }
      }
      return acc
    })

    if (accountUpdated) {
      await payload.updateGlobal({
        slug: 'settings',
        data: {
          accountData: updatedAccountData,
        },
      })
    }
  } catch (error) {
    payload.logger.error(`Failed to update account status for ${accountEmail}: ${error}`)
  }
}
