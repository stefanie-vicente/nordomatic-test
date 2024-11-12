import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import BuildingForm from "@/components/BuildingForm";
import { CREATE_BUILDING, UPDATE_BUILDING } from "@/graphql/buildingMutations";
import { IBuilding } from "@/types/IBuilding";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const mockCreateBuilding = jest.fn();
const mockUpdateBuilding = jest.fn();

jest.mock("@apollo/client", () => {
  const actual = jest.requireActual("@apollo/client");
  return {
    ...actual,
    useMutation: jest.fn((mutation) => {
      if (mutation === CREATE_BUILDING) {
        return [mockCreateBuilding, { loading: false, error: null }];
      }
      if (mutation === UPDATE_BUILDING) {
        return [mockUpdateBuilding, { loading: false, error: null }];
      }
      return [jest.fn(), { loading: false, error: null }];
    }),
    gql: jest.fn((query) => query),
  };
});

describe("BuildingForm", () => {
  const mockRouterPush = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form fields correctly for creation", () => {
    render(<BuildingForm type="create" />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /create building/i })
    ).toBeInTheDocument();
  });

  it("renders the form fields correctly for update", () => {
    const building: IBuilding = {
      id: 1,
      name: "Building A",
      address: "123 Main St",
      currentTemperature: 20,
      temperatureScale: "Celsius",
      temperatureRecords: [],
    };
    render(<BuildingForm type="update" building={building} />);

    expect(screen.getByLabelText(/name/i)).toHaveValue("Building A");
    expect(screen.getByLabelText(/address/i)).toHaveValue("123 Main St");
    expect(
      screen.getByRole("heading", { name: /update building/i })
    ).toBeInTheDocument();
  });

  it("updates form values on user input", () => {
    render(<BuildingForm type="create" />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "New Building" },
    });
    fireEvent.change(screen.getByLabelText(/address/i), {
      target: { value: "456 Elm St" },
    });

    expect(screen.getByLabelText(/name/i)).toHaveValue("New Building");
    expect(screen.getByLabelText(/address/i)).toHaveValue("456 Elm St");
  });

  it("calls createBuilding mutation on form submit for creation", async () => {
    mockCreateBuilding.mockResolvedValueOnce({
      data: { createBuilding: { id: "1" } },
    });

    render(<BuildingForm type="create" />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "New Building" },
    });
    fireEvent.change(screen.getByLabelText(/address/i), {
      target: { value: "456 Elm St" },
    });
    fireEvent.change(screen.getByLabelText(/current temperature/i), {
      target: { value: "22" },
    });

    fireEvent.click(screen.getByLabelText("save building"));

    await waitFor(() => {
      expect(mockCreateBuilding).toHaveBeenCalledWith({
        variables: {
          name: "New Building",
          address: "456 Elm St",
          currentTemperature: 22,
          temperatureScale: "Celsius",
        },
      });
    });

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith("/buildings/1");
    });
  });

  it("calls updateBuilding mutation on form submit for update", async () => {
    const building: IBuilding = {
      id: 2,
      name: "Old Building",
      address: "789 Oak St",
      currentTemperature: 25,
      temperatureScale: "Celsius",
      temperatureRecords: [],
    };

    mockUpdateBuilding.mockResolvedValueOnce({
      data: { updateBuilding: { id: "2" } },
    });

    render(<BuildingForm type="update" building={building} />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Updated Building" },
    });

    fireEvent.click(screen.getByLabelText("save building"));

    await waitFor(() => {
      expect(mockUpdateBuilding).toHaveBeenCalledWith({
        variables: {
          id: 2,
          name: "Updated Building",
          address: "789 Oak St",
          currentTemperature: 25,
          temperatureScale: "Celsius",
        },
      });
    });

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith("/buildings/2");
    });
  });
});
