import { gql } from "graphql-tag";

export const buildingTypeDefs = gql`
  scalar DateTime

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
    temperatureScale: String!
    createdAt: DateTime!
    updatedAt: DateTime
    temperatureRecords: [TemperatureRecord!]!
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
      temperatureScale: String!
    ): Building
    updateBuilding(
      id: Int!
      name: String
      address: String
      currentTemperature: Float
      temperatureScale: String
    ): Building
    deleteBuilding(id: Int!): Boolean
  }
`;
