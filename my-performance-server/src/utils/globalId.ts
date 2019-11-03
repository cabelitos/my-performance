export const toGlobalId = (typeName: string, id: string): string =>
  Buffer.from(`${typeName}${id}`).toString('base64');

export const fromGlobalId = (typeName: string, id: string): string =>
  Buffer.from(id, 'base64')
    .toString('utf8')
    .replace(typeName, '');
