import { gql } from "graphql-tag";

export const buildingTypeDefs = gql`
  type TemperatureRecord {
    id: Int!
    temperature: Float!
    action: String!
  }

  type Building {
    id: Int!
    name: String
    address: String!
    currentTemperature: Float!
    temperatureScale: String!
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
    deleteBuilding(id: Int!): Building
  }
`;
