import { gql } from 'graphql-tag';

export const buildingTypeDefs = gql`
  type Building {
    id: Int!
    name: String!
    address: String!
  }

  type Query {
    buildings: [Building!]!
    building(id: Int!): Building
  }
`;
