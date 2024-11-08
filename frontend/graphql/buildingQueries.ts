import { gql } from "@apollo/client";

export const GET_BUILDINGS = gql`
  query Buildings {
    buildings {
      id
      address
      name
      currentTemperature
      temperatureScale
      temperatureRecords {
        action
        buildingId
        temperature
        createdAt
      }
    }
  }
`;

export const GET_BUILDING = gql`
  query Building($id: Int!) {
    building(id: $id) {
      id
      address
      name
      currentTemperature
      temperatureScale
      temperatureRecords {
        action
        buildingId
        temperature
        createdAt
      }
    }
  }
`;
