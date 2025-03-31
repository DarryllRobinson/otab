import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Tile from "./Tile";

describe("Tile", () => {
  const mockProps = {
    id: 1,
    title: "Test Song",
    actualArtist: "Artist A",
    artists: ["Artist A", "Artist B", "Artist C"],
    tileBgColour: "#ffffff",
    tileBgColourHover: "#f0f0f0",
    tileBorderColour: "#000000",
    tileTextColour: "#000000",
    tileBorderRadius: 5,
    submitted: false,
    chosenArtist: "",
    correctArtist: false,
  };

  it("should render the tile with the correct title", () => {
    const { getByText } = render(<Tile {...mockProps} />);
    expect(getByText("Test Song")).toBeInTheDocument();
  });

  it("should flip the tile when clicked", () => {
    const { container } = render(<Tile {...mockProps} />);
    const tile = container.querySelector(".flip-container");

    expect(tile).not.toHaveClass("flipped");
    fireEvent.click(tile); // Simulate click to flip the tile
    expect(tile).toHaveClass("flipped");
  });

  it("should display an error message if no artist is selected on submit", () => {
    const { getByText, getByRole } = render(<Tile {...mockProps} />);
    const submitButton = getByRole("button", { name: /submit/i });

    fireEvent.click(submitButton); // Simulate form submission without selecting an artist
    expect(getByText("Please choose an artist")).toBeInTheDocument();
  });

  it("should call the saveTile function after submission", () => {
    const saveTileMock = jest.fn();
    const { getByRole, getByLabelText } = render(
      <Tile {...mockProps} saveTile={saveTileMock} />
    );

    const artistOption = getByLabelText("Artist A"); // Select an artist
    fireEvent.click(artistOption);

    const submitButton = getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton); // Submit the form

    expect(saveTileMock).toHaveBeenCalledWith({
      id: mockProps.id,
      actualArtist: mockProps.actualArtist,
      chosenArtist: "Artist A",
      correctArtist: true, // Assuming the chosen artist matches the actual artist
      correctSong: false, // Assuming no song check logic here
      submitted: true,
    });
  });

  it("should disable the submit button after submission", () => {
    const { getByRole, getByLabelText } = render(<Tile {...mockProps} />);
    const artistOption = getByLabelText("Artist A");
    fireEvent.click(artistOption);

    const submitButton = getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled(); // Ensure the button is disabled after submission
  });
});
