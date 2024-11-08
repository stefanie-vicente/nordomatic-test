import { gql } from "graphql-tag";

export const buildingTypeDefs = gql`
  scalar DateTime

  enum TemperatureScale {
    Celsius
    Fahrenheit
  }

  type TemperatureRecord {
    id: Int!
    buildingId: Int!
    temperature: Float!
    action: String!
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

  type DeleteReturn {
    success: Boolean!
    message: String!
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
    deleteBuilding(id: Int!): DeleteReturn
  }
`;
