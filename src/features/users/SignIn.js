import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce"; // Import debounce
import { Form, redirect } from "react-router";
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  CircularProgress, // Import CircularProgress
  useTheme,
} from "@mui/material";
import { userService } from "./user.service";

export async function loginAction({ request }) {
  const formData = await request.formData();
  const userDetails = Object.fromEntries(formData);
  await userService.login(userDetails);
  return redirect("/dashboard");
}

export default function SignIn() {
  const theme = useTheme();
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(""); // State for API error messages
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  useEffect(() => {
    document.getElementById("email").focus(); // Set focus to the email field on load
  }, []);

  const validateForm = useCallback(
    debounce((formData) => {
      const newErrors = {};
      if (!formData.email) newErrors.email = "Email is required.";
      if (!formData.password) newErrors.password = "Password is required.";
      setErrors(newErrors);
    }, 300), // Debounce validation
    []
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userDetails = Object.fromEntries(formData);
    validateForm(userDetails);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      try {
        await userService.login(userDetails);
        window.location.href = "/dashboard";
      } catch (error) {
        setApiError("Failed to sign in. Please check your credentials.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>
        {apiError && (
          <Typography variant="body2" color="error" gutterBottom>
            {apiError}
          </Typography>
        )}
        <Form method="post" id="signin-form" onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              id="email"
              label="Email address"
              name="email"
              type="email"
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              required
              aria-required="true" // Added ARIA attribute
            />
            <TextField
              id="password"
              label="Password"
              name="password"
              type="password"
              error={!!errors.password}
              helperText={errors.password}
              fullWidth
              required
              aria-required="true" // Added ARIA attribute
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{
                mt: 2,
                py: 1.5,
                fontSize: "1rem",
              }}
              aria-label="Sign in to your account" // Added ARIA label
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? <CircularProgress size={24} /> : "Sign In"}{" "}
              {/* Show loading spinner */}
            </Button>
          </Box>
        </Form>
      </Paper>
    </Box>
  );
}
