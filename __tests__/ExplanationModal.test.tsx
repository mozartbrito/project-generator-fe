import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ExplanationModal from "../app/components/ExplanationModal";

const mockOnClose = jest.fn();

describe("ExplanationModal Component", () => {
  test("renders ExplanationModal when isOpen is true", () => {
    render(<ExplanationModal isOpen={true} onClose={mockOnClose} explanation="This is a test explanation." />);

    expect(screen.getByText("Explicação da Solução")).toBeInTheDocument();
    expect(screen.getByText("Detalhes sobre o código gerado")).toBeInTheDocument();
    expect(screen.getByText("This is a test explanation.")).toBeInTheDocument();
  });

  test("does not render ExplanationModal when isOpen is false", () => {
    render(<ExplanationModal isOpen={false} onClose={mockOnClose} explanation="This is a test explanation." />);

    expect(screen.queryByText("Explicação da Solução")).not.toBeInTheDocument();
    expect(screen.queryByText("Detalhes sobre o código gerado")).not.toBeInTheDocument();
    expect(screen.queryByText("This is a test explanation.")).not.toBeInTheDocument();
  });

  test("calls onClose when the modal is closed", () => {
    render(<ExplanationModal isOpen={true} onClose={mockOnClose} explanation="This is a test explanation." />);
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(mockOnClose).toHaveBeenCalled();

  });
});