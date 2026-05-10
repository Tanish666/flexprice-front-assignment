import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import EmptyState from "../EmptyState";

describe("EmptyState Component", () => {
  it("renders the headline and subtext", () => {
    render(
      <EmptyState
        icon={<svg data-testid="test-icon" />}
        headline="No Data Found"
        subtext="Please create some data to get started."
      />,
    );

    expect(screen.getByText("No Data Found")).toBeInTheDocument();
    expect(
      screen.getByText("Please create some data to get started."),
    ).toBeInTheDocument();
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  it("renders a button if buttonLabel and onButtonClick are provided", () => {
    const handleClick = vi.fn();
    render(
      <EmptyState
        icon={<span />}
        headline="Empty"
        subtext="Empty subtext"
        buttonLabel="Create New"
        onButtonClick={handleClick}
      />,
    );

    const button = screen.getByRole("button", { name: /create new/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not render a button if buttonLabel is not provided", () => {
    render(
      <EmptyState icon={<span />} headline="Empty" subtext="Empty subtext" />,
    );

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
