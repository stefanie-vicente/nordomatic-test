import { ApolloServer, gql } from "apollo-server";
import { buildingResolvers } from "../resolvers/building";
import { buildingTypeDefs } from "../schemas/building";
import { GraphQLDateTime } from "../scalars/DateTime";

const typeDefs = [buildingTypeDefs];
const resolvers = {
  ...buildingResolvers,
  DateTime: GraphQLDateTime,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

describe("Building Resolvers", () => {
  it("fetches all buildings", async () => {
    const response = await server.executeOperation({
      query: gql`
        query {
          buildings {
            id
            name
            address
            currentTemperature
            temperatureScale
            temperatureRecords {
              temperature
              action
            }
          }
        }
      `,
    });
    expect(response.errors).toBeUndefined();
    expect(response.data?.buildings).toHaveLength(10);
    expect(response.data?.buildings[0].name).toBe("Building A");
    expect(response.data?.buildings[0].temperatureRecords[0].action).toBe(
      "Initial"
    );
  });

  it("fetches a specific building by ID", async () => {
    const response = await server.executeOperation({
      query: gql`
        query ($id: Int!) {
          building(id: $id) {
            id
            name
            address
            currentTemperature
            temperatureScale
            temperatureRecords {
              temperature
              action
            }
          }
        }
      `,
      variables: { id: 1 },
    });

    expect(response.errors).toBeUndefined();
    expect(response.data?.building).toBeDefined();
    expect(response.data?.building.id).toBe(1);
    expect(response.data?.building.name).toBe("Building A");
    expect(response.data?.building.temperatureRecords[0].action).toBe(
      "Initial"
    );
  });

  it("returns an error if building not found", async () => {
    const response = await server.executeOperation({
      query: gql`
        query ($id: Int!) {
          building(id: $id) {
            id
            name
            address
          }
        }
      `,
      variables: { id: 999 }, // ID that doesn't exist
    });

    expect(response.errors).toBeDefined();
    expect(response.data?.building).toBeNull();

    if (response.errors && response.errors.length > 0) {
      expect(response.errors[0].message).toBe(
        "Building with ID 999 not found."
      );
    }
  });

  it("creates a new building", async () => {
    const response = await server.executeOperation({
      query: gql`
        mutation (
          $address: String!
          $currentTemperature: Float!
          $temperatureScale: TemperatureScale!
        ) {
          createBuilding(
            address: $address
            currentTemperature: $currentTemperature
            temperatureScale: $temperatureScale
          ) {
            id
            name
            address
            currentTemperature
            temperatureScale
            temperatureRecords {
              temperature
              action
            }
          }
        }
      `,
      variables: {
        address: "New Building",
        currentTemperature: 22.5,
        temperatureScale: "Celsius",
      },
    });

    expect(response.errors).toBeUndefined();
    expect(response.data?.createBuilding).toBeDefined();
    expect(response.data?.createBuilding.address).toBe("New Building");
    expect(response.data?.createBuilding.temperatureScale).toBe("Celsius");
    expect(response.data?.createBuilding.temperatureRecords[0].action).toBe(
      "Initial"
    );
  });

  it("updates an existing building", async () => {
    const response = await server.executeOperation({
      query: gql`
        mutation ($id: Int!, $currentTemperature: Float!) {
          updateBuilding(id: $id, currentTemperature: $currentTemperature) {
            id
            name
            address
            currentTemperature
            temperatureScale
            temperatureRecords {
              temperature
              action
            }
          }
        }
      `,
      variables: {
        id: 1,
        currentTemperature: 25.0, // Simulating a temperature increase
      },
    });

    expect(response.errors).toBeUndefined();
    expect(response.data?.updateBuilding).toBeDefined();
    expect(response.data?.updateBuilding.currentTemperature).toBe(25.0);
    expect(response.data?.updateBuilding.temperatureRecords[1].action).toBe(
      "Increased"
    );
  });

  // it("handles invalid update (non-existing building)", async () => {
  //   const response = await server.executeOperation({
  //     query: gql`
  //       mutation($id: Int!, $currentTemperature: Float!) {
  //         updateBuilding(id: $id, currentTemperature: $currentTemperature) {
  //           id
  //           name
  //           address
  //         }
  //       }
  //     `,
  //     variables: {
  //       id: 999,  // ID that doesn't exist
  //       currentTemperature: 25.0,
  //     },
  //   });

  //   expect(response.errors).toBeDefined();
  //   expect(response.errors[0].message).toBe("Building with ID 999 not found.");
  // });

  it("deletes a building successfully", async () => {
    const response = await server.executeOperation({
      query: gql`
        mutation ($id: Int!) {
          deleteBuilding(id: $id) {
            success
            message
            id
            operation
          }
        }
      `,
      variables: { id: 1 },
    });

    expect(response.errors).toBeUndefined();
    expect(response.data?.deleteBuilding.success).toBe(true);
    expect(response.data?.deleteBuilding.message).toBe(
      "Building with ID 1 was successfully deleted."
    );
  });

  it("returns an error if building not found during deletion", async () => {
    const response = await server.executeOperation({
      query: gql`
        mutation ($id: Int!) {
          deleteBuilding(id: $id) {
            success
            message
            id
            errorCode
          }
        }
      `,
      variables: { id: 999 }, // ID that doesn't exist
    });

    expect(response.errors).toBeUndefined();
    expect(response.data?.deleteBuilding.success).toBe(false);
    expect(response.data?.deleteBuilding.message).toBe(
      "Building with ID 999 does not exist."
    );
    expect(response.data?.deleteBuilding.errorCode).toBe("NOT_FOUND");
  });
});
