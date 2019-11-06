import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { GraphQLError } from 'graphql/error';

const isDateValid = (date: Date, value: string): boolean =>
  Number.isNaN(date.getTime()) || date.toISOString() !== value;

export default {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue: (value: string): Date => {
      const date = new Date(value);
      if (isDateValid(date, value)) {
        throw new TypeError(`Impossible to convert ${value} as date`);
      }
      return date;
    },
    serialize: (value: Date): string => {
      if (Number.isNaN(value.getTime())) {
        throw new TypeError(`In valid date object: ${value.toJSON()}`);
      }
      return value.toISOString();
    },
    parseLiteral: (ast): Date => {
      if (ast.kind !== Kind.STRING) {
        throw new GraphQLError(
          `Date objects can only be represented as string - received: ${ast.kind}`,
        );
      }

      const date = new Date(ast.value);

      if (isDateValid(date, ast.value)) {
        throw new GraphQLError(`Value should follow ISO format: ${ast.value}`);
      }

      return date;
    },
  }),
};
