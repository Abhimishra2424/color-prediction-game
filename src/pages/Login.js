import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import { useAuth } from "../context/AuthContext"; // Import useAuth

function Login() {
  const { loginUser } = useAuth(); // Get login function from AuthContext
  const [loginType, setLoginType] = useState("email");
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLoginTypeChange = (e) => {
    setLoginType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const success = await loginUser(form.identifier, form.password);

    if (!success) {
      setError("Invalid credentials. Please try again.");
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h3" color="primary" fontWeight="bold">
          Color Prediction
        </Typography>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 3,
          bgcolor: "#f5f5f5",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <FormControl fullWidth>
          <InputLabel>Login Type</InputLabel>
          <Select value={loginType} onChange={handleLoginTypeChange}>
            <MenuItem value="email">Email</MenuItem>
            <MenuItem value="phone">Phone Number</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label={loginType === "email" ? "Email" : "Phone Number"}
          name="identifier"
          fullWidth
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          variant="outlined"
          onChange={handleChange}
        />
        {error && (
          <Typography color="error" textAlign="center">
            {error}
          </Typography>
        )}
        <Button type="submit" variant="contained" color="primary" size="large" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </Box>
    </Container>
  );
}

export default Login;
