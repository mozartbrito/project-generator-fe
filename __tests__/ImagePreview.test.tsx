import { render, screen } from "@testing-library/react";
import ImagePreview from "../app/components/ImagePreview";

// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => "http://localhost/mocked-url");

describe("ImagePreview Component", () => {
  test("renders without images", () => {
    render(<ImagePreview images={[]} />);
    expect(screen.getByText(/no images/i)).toBeInTheDocument();
  });

  test("renders with multiple images", () => {
    const images = [
      new File(["image1"], "image1.png", { type: "image/png" }),
      new File(["image2"], "image2.png", { type: "image/png" }),
    ];

    render(<ImagePreview images={images} />);

    const imageElements = screen.getAllByRole("img");
    expect(imageElements).toHaveLength(images.length);

    imageElements.forEach((img, index) => {
      expect(img).toHaveAttribute("alt", `Prototype ${index + 1}`);
    });
  });
});