// FILE: __tests__/AboutModal.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ExplanationModal from "../app/components/AboutModal";

const mockOnClose = jest.fn();

describe("ExplanationModal Component", () => {
  test("renders ExplanationModal when isOpen is true", () => {
    render(<ExplanationModal isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText("Sobre o projecto")).toBeInTheDocument();
    expect(screen.getByText("Detalhes sobre funcionamento e vantagens")).toBeInTheDocument();
    expect(screen.getByText("Gerador de Interfaces em HTML com IA")).toBeInTheDocument();
  });

  test("does not render ExplanationModal when isOpen is false", () => {
    render(<ExplanationModal isOpen={false} onClose={mockOnClose} />);

    expect(screen.queryByText("Sobre o projecto")).not.toBeInTheDocument();
    expect(screen.queryByText("Detalhes sobre funcionamento e vantagens")).not.toBeInTheDocument();
    expect(screen.queryByText("Gerador de Interfaces em HTML com IA")).not.toBeInTheDocument();
  });

  test("calls onClose when the modal is closed", () => {
    render(<ExplanationModal isOpen={true} onClose={mockOnClose} />);
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(mockOnClose).toHaveBeenCalled();
  });
});