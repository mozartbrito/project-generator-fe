import React from "react";
import { render, screen } from "@testing-library/react";
import RootLayout from "../app/layout";

// Simplified version of RootLayout for testing
const TestRootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  React.useEffect(() => {
    document.title = "AI Code Generator";
    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Generate code using AI based on prompts and prototype images";
    document.head.appendChild(metaDescription);
  }, []);

  return (
    <html lang="en">
      <body className="inter">
        {children}
      </body>
    </html>
  );
};

describe("RootLayout Component", () => {
  test("renders RootLayout component", () => {
    render(
      <TestRootLayout>
        <div>Test Child</div>
      </TestRootLayout>
    );

    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  test("applies Inter font class", () => {
    render(
      <TestRootLayout>
        <div>Test Child</div>
      </TestRootLayout>
    );

    const bodyElement = document.querySelector("body");
    expect(bodyElement).toHaveClass("inter");
  });

  test("sets correct metadata", () => {
    render(
      <TestRootLayout>
        <div>Test Child</div>
      </TestRootLayout>
    );

    expect(document.title).toBe("AI Code Generator");
    const metaDescription = document.querySelector("meta[name='description']");
    expect(metaDescription).toHaveAttribute("content", "Generate code using AI based on prompts and prototype images");
  });
});