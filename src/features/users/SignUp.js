import React, { useState, useCallback } from "react";
import debounce from "lodash.debounce"; // Import debounce
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
  CircularProgress, // Import CircularProgress
  useTheme,
} from "@mui/material";

export default function SignUp() {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  const validateForm = useCallback(
    debounce(() => {
      const newErrors = {};
      if (!formData.firstName) newErrors.firstName = "First name is required.";
      if (!formData.lastName) newErrors.lastName = "Last name is required.";
      if (!formData.email) newErrors.email = "Email is required.";
      if (!formData.password) newErrors.password = "Password is required.";
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match.";
      if (!formData.acceptTerms)
        newErrors.acceptTerms = "You must accept the terms and conditions.";
      setErrors(newErrors);
    }, 300), // Debounce validation
    [formData]
  );

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    validateForm();

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      try {
        console.log("Form submitted:", formData);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
        window.location.href = "/welcome";
      } catch (error) {
        setApiError("Failed to sign up. Please try again later.");
      } finally {
        setIsLoading(false); // Hide loading indicator
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
          maxWidth: 500,
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        {apiError && (
          <Typography variant="body2" color="error" gutterBottom>
            {apiError}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                  />
                }
                label="I accept the terms and conditions."
              />
              {errors.acceptTerms && (
                <Typography variant="body2" color="error">
                  {errors.acceptTerms}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, py: 1.5, fontSize: "1rem" }}
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? <CircularProgress size={24} /> : "Sign Up"}{" "}
            {/* Show loading spinner */}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
