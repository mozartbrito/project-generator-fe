import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { jest } from '@jest/globals';
import { Login } from "../app/components/Login";
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

const mockOnLogin = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  fetchMock.resetMocks();
});

describe("Login Component", () => {
  test("renders Login component", () => {
    render(<Login onLogin={mockOnLogin} />);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("handles form submission with valid credentials", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ username: "testuser", token: "testtoken" }));

    render(<Login onLogin={mockOnLogin} />);

    fireEvent.change(screen.getByLabelText("Username"), { target: { value: "testuser" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "password" } });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => expect(mockOnLogin).toHaveBeenCalledWith("testuser", "testtoken"));
  });

  test("handles form submission with invalid credentials", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });

    render(<Login onLogin={mockOnLogin} />);

    fireEvent.change(screen.getByLabelText("Username"), { target: { value: "wronguser" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "wrongpassword" } });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => expect(screen.getByText("Invalid credentials")).toBeInTheDocument());
  });
});