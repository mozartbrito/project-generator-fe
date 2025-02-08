import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CodeBlock from "../app/components/CodeBlock";

// Mock navigator.clipboard.writeText
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockResolvedValue(() => {}),
  },
});

describe("CodeBlock Component", () => {
  test("renders CodeBlock with code", () => {
    const code = "const a = 1;";
    render(<CodeBlock code={code} />);

    expect(screen.getByText("Copiar")).toBeInTheDocument();
    expect(screen.getByRole("code")).toHaveTextContent(code);
  });

  test("renders CodeBlock without code", () => {
    render(<CodeBlock code="" />);

    expect(screen.getByText("O código gerado será exibido aqui.")).toBeInTheDocument();
  });

  test("handles copy to clipboard", async () => {
    const code = "const a = 1;";
    render(<CodeBlock code={code} />);

    const copyButton = screen.getByRole("button", { name: /copiar/i });
    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(code);
    expect(await screen.findByText("Copiado!")).toBeInTheDocument();
  });
});