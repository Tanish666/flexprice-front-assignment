import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button";

describe("Button Component", () => {
  it("renders children correctly", () => {
    render(<Button>Click Me</Button>);
    expect(
      screen.getByRole("button", { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByRole("button", { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("shows loading spinner when isLoading is true and disables button", () => {
    render(<Button isLoading>Loading State</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    // The text shouldn't be directly visible but a spinner svg will be
    const spinner = button.querySelector("svg.animate-spin");
    expect(spinner).toBeInTheDocument();
  });
});
