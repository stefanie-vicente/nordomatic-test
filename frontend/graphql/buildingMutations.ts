import { gql } from "@apollo/client";

export const CREATE_BUILDING = gql`
  mutation CreateBuilding(
    $name: String
    $address: String!
    $currentTemperature: Float!
    $temperatureScale: TemperatureScale!
  ) {
    createBuilding(
      name: $name
      address: $address
      currentTemperature: $currentTemperature
      temperatureScale: $temperatureScale
    ) {
      id
      name
      address
      createdAt
      updatedAt
      temperatureScale
      temperatureRecords {
        action
        createdAt
        temperature
      }
    }
  }
`;

export const UPDATE_BUILDING = gql`
  mutation UpdateBuilding(
    $id: Int!
    $name: String
    $currentTemperature: Float
  ) {
    updateBuilding(
      id: $id
      name: $name
      currentTemperature: $currentTemperature
    ) {
      id
      name
      address
      currentTemperature
      temperatureScale
      temperatureRecords {
        action
        temperature
        createdAt
      }
    }
  }
`;
