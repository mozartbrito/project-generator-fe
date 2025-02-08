import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { History } from "../app/components/History";
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

const mockOnItemClick = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  fetchMock.resetMocks();
});

describe("History Component", () => {
  test("renders without history items", async () => {
    fetchMock.mockResponseOnce(JSON.stringify([]));

    render(<History token="test-token" onItemClick={mockOnItemClick} />);

    await waitFor(() => expect(screen.getByText(/no history items/i)).toBeInTheDocument());
  });

  test("renders with multiple history items", async () => {
    const historyItems = [
      { id: 1, prompt: "Prompt 1", generated_code: "Code 1", image_path: null, created_at: "2023-01-01" },
      { id: 2, prompt: "Prompt 2", generated_code: "Code 2", image_path: null, created_at: "2023-01-02" },
    ];
    fetchMock.mockResponseOnce(JSON.stringify(historyItems));

    render(<History token="test-token" onItemClick={mockOnItemClick} />);

    await waitFor(() => {
      historyItems.forEach(item => {
        expect(screen.getByText(item.prompt)).toBeInTheDocument();
      });
    });
  });

  test("handles fetch errors", async () => {
    fetchMock.mockRejectOnce(new Error("Failed to fetch"));

    render(<History token="test-token" onItemClick={mockOnItemClick} />);

    await waitFor(() => expect(screen.getByText(/error fetching history/i)).toBeInTheDocument());
  });

  test("handles unauthorized access", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ message: "Unauthorized" }), { status: 403 });

    render(<History token="test-token" onItemClick={mockOnItemClick} />);

    await waitFor(() => expect(screen.getByText(/unauthorized/i)).toBeInTheDocument());
  });
});