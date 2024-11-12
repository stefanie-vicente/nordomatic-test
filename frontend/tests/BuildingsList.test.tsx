import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/router";
import BuildingsList from "@/components/BuildingsList";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/components/BuildingsListTable", () => {
  return jest.fn(() => <div data-testid="buildings-list-table" />);
});

describe("BuildingsList Component", () => {
  const mockRouterPush = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the BuildingsList component structure", () => {
    render(<BuildingsList />);

    expect(screen.getByText("Buildings")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /create building/i })
    ).toBeInTheDocument();

    expect(screen.getByTestId("buildings-list-table")).toBeInTheDocument();
  });

  it("navigates to /buildings/create when the create button is clicked", () => {
    render(<BuildingsList />);

    const createButton = screen.getByRole("button", {
      name: /create building/i,
    });
    fireEvent.click(createButton);

    expect(mockRouterPush).toHaveBeenCalledWith("/buildings/create");
  });
});
