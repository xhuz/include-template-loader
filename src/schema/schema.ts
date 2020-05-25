export const schema = {
  type: ['object', 'null'],
  properties: {
    sign: {
      type: 'array',
      maxItems: 2,
      minItems: 2,
      items: {
        type: 'string'
      }
    },
    deep: {
      type: 'integer',
      minimum: 1,
      maximum: 5
    }
  }
};
