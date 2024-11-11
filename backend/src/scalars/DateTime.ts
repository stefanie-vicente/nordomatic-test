import { GraphQLScalarType, Kind } from "graphql";

export const GraphQLDateTime = new GraphQLScalarType({
  name: "DateTime",
  description: "A valid ISO-8601 encoded date-time value",

  parseValue(value: unknown): Date {
    if (typeof value === "string") {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid ISO-8601 string format for DateTime scalar.");
      }
      return date;
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
      const date = new Date(ast.value);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid ISO-8601 string format for DateTime literal.");
      }
      return date;
    }
    return null;
  },
});
