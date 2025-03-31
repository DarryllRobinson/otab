import React, { useState } from "react";
import { Form, redirect } from "react-router";
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
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

  const validateForm = (formData) => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userDetails = Object.fromEntries(formData);
    const validationErrors = validateForm(userDetails);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // Submit the form
      event.target.submit();
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
        <Form method="post" id="signin-form" onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Email address"
              name="email"
              type="email"
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              error={!!errors.password}
              helperText={errors.password}
              fullWidth
              required
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
            >
              Sign In
            </Button>
          </Box>
        </Form>
      </Paper>
    </Box>
  );
}
