import { nextCookies } from 'better-auth/next-js'
import { admin, emailOTP, multiSession, phoneNumber, username } from 'better-auth/plugins'
import { passkey } from 'better-auth/plugins/passkey'
import { emailHarmony, phoneHarmony } from 'better-auth-harmony'
import { getPayload } from 'payload'
import type { BetterAuthOptions, BetterAuthPluginOptions } from 'payload-auth/better-auth'
import payloadConfig from '@/payload.config'
import {
  sendAdminInviteEmail,
  sendChangeEmailVerification,
  sendDeleteAccountVerification,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendVerificationOTP,
} from './email-templates'

const isDev = process.env.NODE_ENV === 'development'

const betterAuthPlugins = [
  username(),
  emailHarmony(),
  phoneHarmony({
    defaultCountry: 'US',
  }),
  phoneNumber({
    sendOTP: async ({ phoneNumber, code }, _req) => {
      //TODO: Use Twilio to send OTP
      console.log('Send OTP for user: ', phoneNumber, code)
    },
  }),
  emailOTP({
    async sendVerificationOTP({ email, otp, type }) {
      await sendVerificationOTP({ email, otp, type })
    },
  }),
  passkey({
    rpID: isDev ? 'localhost' : 'ticketer.com',
    rpName: isDev ? 'ticketer Local' : 'Ticketer',
    origin: process.env.NEXT_PUBLIC_SERVER_URL,
  }),
  admin(),
  multiSession(),
  nextCookies(), // needs to be last
]

export type BetterAuthPlugins = typeof betterAuthPlugins

const betterAuthOptions: BetterAuthOptions = {
  appName: 'Ticketer',
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  trustedOrigins: [process.env.NEXT_PUBLIC_BETTER_AUTH_URL],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    // autoSignIn: true,
    async sendResetPassword({ user, url, token }) {
      console.log('Send reset password email: ', user, url, token)
      await sendResetPasswordEmail({ user, url, token })
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }) => {
      await sendVerificationEmail({ user, url, token })
    },
    onEmailVerification: async (user) => {
      const config = await payloadConfig
      const payload = await getPayload({ config })
      if (isDev) console.log('✅ Update user verified to true: ', user.id)
      await payload.update({
        collection: 'users',
        id: user.id,
        data: { verified: true },
      })
    },
  },
  plugins: betterAuthPlugins,
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ user, newEmail, url, token }) => {
        await sendChangeEmailVerification({ user, newEmail, url, token })
      },
    },
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url, token }) => {
        await sendDeleteAccountVerification({ user, url, token })
      },
      beforeDelete: async (_user) => {},
      afterDelete: async (user) => {
        console.log('[afterDelete] user: ', user)
      },
    },
    additionalFields: {
      //* Overrite the default fields to make "name" optional
      name: {
        required: false,
        input: true,
        type: 'string',
      },
      role: {
        type: 'string',
        defaultValue: 'user',
        input: false,
      },
      verified: {
        type: 'boolean',
        defaultValue: false,
        input: false,
      },
    },
  },
  session: {
    //! Caching causes payload ui to break: session.createdAt is required but
    //! this is not available right after user logs in.
    // cookieCache: {
    //   enabled: true,
    //   maxAge: 5 * 60, // Cache duration in seconds
    // },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ['email-password'],
    },
  },
}

export const betterAuthPluginOptions: BetterAuthPluginOptions = {
  // debug: {
  //   logTables: false,
  //   enableDebugLogs: true,
  // },
  disableDefaultPayloadAuth: true,
  hidePluginCollections: true,
  collectionAdminGroup: 'Access',
  users: {
    slug: 'users',
    hidden: false,
    adminRoles: ['admin'],
    allowedFields: ['name'],
    roles: ['admin', 'user'],
  },
  accounts: {
    slug: 'accounts',
    collectionOverrides: (defaults) => {
      const prevConf = defaults.collection
      return {
        ...prevConf,
        labels: {
          singular: 'Account',
          plural: 'Accounts',
        },
        enableQueryPresets: true,
        folders: true,
        trash: true,
      }
    },
  },
  sessions: {
    slug: 'sessions',
    collectionOverrides: (defaults) => {
      const prevConf = defaults.collection
      return {
        ...prevConf,
        enableQueryPresets: true,
        folders: true,
        trash: true,
      }
    },
  },
  verifications: {
    slug: 'verifications',
    collectionOverrides: (defaults) => {
      const prevConf = defaults.collection
      return {
        ...prevConf,

        enableQueryPresets: true,
        folders: true,
        trash: true,
      }
    },
  },
  adminInvitations: {
    sendInviteEmail: async ({ payload, email, url }) => {
      await sendAdminInviteEmail({ email, url })
      return {
        success: true,
      }
    },
    collectionOverrides: (defaults) => {
      const prevConf = defaults.collection
      return {
        ...prevConf,
        labels: {
          singular: 'Invitation',
          plural: 'Invitations',
        },
        enableQueryPresets: true,
        folders: true,
        trash: true,
      }
    },
  },
  betterAuthOptions: betterAuthOptions,
}
