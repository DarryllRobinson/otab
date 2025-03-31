import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Tile from "./Tile";
import { tileService } from "./tile.service"; // Import the tileService to mock it

jest.mock("./tile.service"); // Mock the tileService

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

  const mockDebounceFunction = (fn) => fn; // Mock debounce function to bypass delay

  beforeEach(() => {
    // Mock tileService.getSong to return a valid song object
    tileService.getSong = jest.fn().mockReturnValue({ song: "Test Song" });
  });

  it("should render the tile with the correct title", () => {
    render(<Tile {...mockProps} />);
    const titleElement = screen.getByText("Test Song", { selector: "h4" }); // Use Testing Library to find the <h4> element by text
    expect(titleElement).toBeInTheDocument();
  });

  it("should flip the tile when clicked", () => {
    render(<Tile {...mockProps} debounceFunction={mockDebounceFunction} />);
    const flipContainer = screen.getByTestId("flip-container"); // Select the flip-container element using Testing Library

    expect(flipContainer).not.toHaveClass("flipped");
    fireEvent.click(flipContainer); // Simulate click to flip the tile
    expect(flipContainer).toHaveClass("flipped");
  });

  it("should display an error message if no artist is selected on submit", () => {
    render(<Tile {...mockProps} />);
    const submitButton = screen
      .getAllByRole("button", { name: /submit/i })
      .find((button) => button.type === "submit"); // Ensure we select the correct submit button

    fireEvent.click(submitButton); // Simulate form submission without selecting an artist
    expect(screen.getByText("Please choose an artist")).toBeInTheDocument();
  });

  it("should call the tileService.update function after submission", () => {
    const updateMock = jest.fn();
    tileService.update = updateMock; // Mock the update function

    render(<Tile {...mockProps} />);

    const artistOption = screen.getByLabelText("Artist A"); // Select an artist
    const submitButton = screen
      .getAllByRole("button", { name: /submit/i })
      .find((button) => button.type === "submit"); // Ensure we select the correct submit button

    fireEvent.click(artistOption);
    fireEvent.click(submitButton); // Submit the form

    expect(updateMock).toHaveBeenCalledWith(mockProps.id, {
      id: mockProps.id,
      actualArtist: mockProps.actualArtist,
      chosenArtist: "Artist A",
      correctArtist: true, // Assuming the chosen artist matches the actual artist
      correctSong: true, // The mocked song matches the title
      submitted: true,
    });
  });

  it("should disable the submit button after submission", () => {
    render(<Tile {...mockProps} />);
    const artistOption = screen.getByLabelText("Artist A");
    const submitButton = screen
      .getAllByRole("button", { name: /submit/i })
      .find((button) => button.type === "submit"); // Ensure we select the correct submit button

    fireEvent.click(artistOption);
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled(); // Ensure the button is disabled after submission
  });
});
