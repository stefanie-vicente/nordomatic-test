import { GraphQLScalarType, Kind } from "graphql";

export const GraphQLDateTime = new GraphQLScalarType({
  name: "DateTime",
  description: "A valid ISO-8601 encoded date-time value",

  parseValue(value: unknown): Date {
    if (typeof value === "string") {
      return new Date(value);
    }
    throw new Error("Invalid value for DateTime scalar. Expected a string.");
  },

  serialize(value: unknown): string {
    if (value instanceof Date) {
      return value.toISOString();
    }
    throw new Error(
      "Invalid value for DateTime scalar. Expected a Date object."
    );
  },

  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});
