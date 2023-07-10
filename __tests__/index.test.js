import { render, screen } from "@testing-library/react";
import Home from "@/pages";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("renders a text", () => {
    render(<Home />);
    const text = screen.getByText("Hello World");
    expect(text).toBeInTheDocument();
  });
});
