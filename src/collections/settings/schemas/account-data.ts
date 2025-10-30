export const accountDataSchema: any = {
  uri: 'a://b/account-schema.json',
  fileMatch: ['a://b/account-schema.json'],
  schema: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['available', 'in-use', 'error', 'used'],
        },
      },
      first: { type: 'string' },
      last: { type: 'string' },
      pass: { type: 'string' },
      email: { type: 'string' },
      card: { type: 'number' },
      exp: { type: 'string' },
      cvc: { type: 'number' },
      zip: { type: 'number' },
      required: ['email', 'card', 'exp', 'cvc', 'zip', 'status'],
    },
  },
}
