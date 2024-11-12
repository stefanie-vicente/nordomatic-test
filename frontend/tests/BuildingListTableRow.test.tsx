import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/router";
import { MockedProvider } from "@apollo/client/testing";
import { mockBuilding, mockRequest } from "./mocks/buildings";
import Row from "@/components/BuildingsListTableRow";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Row Component", () => {
  (require("next/router").useRouter as jest.Mock).mockReturnValue({
    push: jest.fn(),
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the building information", () => {
    const onDeleteMock = jest.fn();

    render(
      <MockedProvider mocks={mockRequest} addTypename={false}>
        <Row building={mockBuilding} onDelete={onDeleteMock} />
      </MockedProvider>
    );

    expect(screen.getByText("Building A")).toBeInTheDocument();
    expect(screen.getByText("123 Street")).toBeInTheDocument();
    expect(screen.getByText("22°Celsius")).toBeInTheDocument();
  });

  it("toggles the collapse when the expand button is clicked", () => {
    const onDeleteMock = jest.fn();

    render(
      <MockedProvider mocks={mockRequest} addTypename={false}>
        <Row building={mockBuilding} onDelete={onDeleteMock} />
      </MockedProvider>
    );

    expect(screen.queryByText("Temperature Records")).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("expand row"));

    expect(screen.getByText("Temperature Records")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("contract row"));

    expect(screen.getByLabelText("expand row")).toBeInTheDocument();

    // expect(screen.queryByText("Temperature Records")).not.toBeInTheDocument();
  });

  it("opens the delete confirmation dialog when delete button is clicked", () => {
    const onDeleteMock = jest.fn();

    render(
      <MockedProvider mocks={mockRequest} addTypename={false}>
        <Row building={mockBuilding} onDelete={onDeleteMock} />
      </MockedProvider>
    );

    fireEvent.click(screen.getByLabelText("delete building"));

    expect(
      screen.getByText(
        "Are you sure you want to delete this building? This action cannot be undone."
      )
    ).toBeInTheDocument();
  });

  it("calls onDelete and triggers delete mutation when delete is confirmed", async () => {
    const onDeleteMock = jest.fn();

    render(
      <MockedProvider mocks={mockRequest} addTypename={false}>
        <Row building={mockBuilding} onDelete={onDeleteMock} />
      </MockedProvider>
    );

    fireEvent.click(screen.getByLabelText("delete building"));

    fireEvent.click(screen.getByRole("button", { name: "Delete" }));

    await waitFor(() => expect(onDeleteMock).toHaveBeenCalledWith(1));
  });

  it("does not trigger delete mutation when cancel is clicked", () => {
    const onDeleteMock = jest.fn();

    render(
      <MockedProvider mocks={mockRequest} addTypename={false}>
        <Row building={mockBuilding} onDelete={onDeleteMock} />
      </MockedProvider>
    );

    fireEvent.click(screen.getByLabelText("delete building"));

    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(onDeleteMock).not.toHaveBeenCalled();
  });

  it("navigates to the edit page when the edit button is clicked", () => {
    const onDeleteMock = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({
      push: onDeleteMock,
    });

    render(
      <MockedProvider mocks={mockRequest} addTypename={false}>
        <Row building={mockBuilding} onDelete={onDeleteMock} />
      </MockedProvider>
    );

    fireEvent.click(screen.getByLabelText("edit building"));

    expect(onDeleteMock).toHaveBeenCalledWith("/buildings/edit/1");
  });
});
