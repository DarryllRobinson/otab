import { createTheme } from "@mui/material/styles";
import { responsiveFontSizes } from "@mui/material/styles";

// Import Inter font
import "@fontsource/inter";

const baseTheme = {
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
        },
      },
    },
  },
};

export const globalLight = responsiveFontSizes(
  createTheme({
    ...baseTheme,
    palette: {
      mode: "light",
      primary: { main: "#4A90E2" },
      secondary: { main: "#50E3C2" },
      background: { default: "#F5F5F5", paper: "#FFFFFF" },
      text: { primary: "#333333", secondary: "#555555" },
    },
  })
);

export const globalDark = responsiveFontSizes(
  createTheme({
    ...baseTheme,
    palette: {
      mode: "dark",
      primary: { main: "#1E88E5" },
      secondary: { main: "#26A69A" },
      background: { default: "#121212", paper: "#1E1E1E" },
      text: { primary: "#E0E0E0", secondary: "#B0B0B0" },
    },
  })
);
