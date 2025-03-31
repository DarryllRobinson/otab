import React from "react";
import { Button, ButtonGroup } from "@mui/material";

export default function ThemeButtons({ themes, chosenTheme, setChosenTheme }) {
  return (
    <ButtonGroup variant="outlined" aria-label="Theming button group">
      {themes.map((theme, id) => (
        <Button
          key={id}
          onClick={() => setChosenTheme(theme.theming)}
          variant={theme.theming === chosenTheme ? "contained" : "outlined"}
        >
          {theme.theming}
        </Button>
      ))}
    </ButtonGroup>
  );
}
