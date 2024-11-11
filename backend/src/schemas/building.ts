import { gql } from "graphql-tag";

export const buildingTypeDefs = gql`
  scalar DateTime

  enum TemperatureScale {
    Celsius
    Fahrenheit
  }

  enum TemperatureAction {
    Increased
    Decreased
    Maintained
    Initial
  }

  enum DeleteErrorCode {
    NOT_FOUND
    DATABASE_ERROR
    UNEXPECTED_ERROR
  }

  type TemperatureRecord {
    id: Int!
    buildingId: Int!
    temperature: Float!
    action: TemperatureAction!
    createdAt: DateTime!
  }

  type Building {
    id: Int!
    name: String
    address: String!
    currentTemperature: Float!
    temperatureScale: TemperatureScale!
    createdAt: DateTime!
    updatedAt: DateTime
    temperatureRecords: [TemperatureRecord!]!
  }

  type DeleteResponse {
    success: Boolean!
    message: String!
    id: Int
    operation: String
    errorCode: DeleteErrorCode
  }

  type Query {
    buildings: [Building!]!
    building(id: Int!): Building
  }

  type Mutation {
    createBuilding(
      name: String
      address: String!
      currentTemperature: Float!
      temperatureScale: TemperatureScale!
    ): Building
    updateBuilding(
      id: Int!
      name: String
      address: String
      currentTemperature: Float
      temperatureScale: TemperatureScale
    ): Building
    deleteBuilding(id: Int!): DeleteResponse
  }
`;
