import { DELETE_BUILDING } from "@/graphql/buildingMutations";
import { IBuilding } from "@/types/IBuilding";

export const mockBuilding: IBuilding = {
  id: 1,
  name: "Building A",
  address: "123 Street",
  currentTemperature: 22,
  temperatureScale: "Celsius",
  temperatureRecords: [],
};

export const mockRequest = [
  {
    request: {
      query: DELETE_BUILDING,
      variables: { id: 1 },
    },
    result: {
      data: {
        deleteBuilding: {
          id: 1,
        },
      },
    },
  },
];
