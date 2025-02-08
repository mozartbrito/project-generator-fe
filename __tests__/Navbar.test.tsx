import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { Navbar } from "../app/components/Navbar";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();
const mockOnLogout = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
});

describe("Navbar Component", () => {
  test("renders Navbar component", () => {
    render(<Navbar username="testuser" onLogout={mockOnLogout} />);

    expect(screen.getByText((content, element) => {
        return element?.textContent === "Generator Project (using AI)";
      })).toBeInTheDocument();
    expect(screen.getByText("Olá, testuser")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sair/i })).toBeInTheDocument();
  });

  test("handles logout", () => {
    render(<Navbar username="testuser" onLogout={mockOnLogout} />);

    fireEvent.click(screen.getByRole("button", { name: /sair/i }));

    expect(mockOnLogout).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith("/");
  });
});