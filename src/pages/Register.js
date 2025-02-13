import React, { useEffect, useState } from "react";
import { TextField, Button, Container, Typography, Box, Alert } from "@mui/material";
import { useAuth } from "../context/AuthContext"; // Import Auth Context
import { useNavigate } from "react-router-dom";

function Register() {
  const { registerUser, error , user } = useAuth(); // Get registerUser function & error from context
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await registerUser(form.username, form.email, form.password);
    if (success) {
      setSuccessMessage("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h3" color="primary" fontWeight="bold">
          Color Prediction
        </Typography>
        <Typography variant="h5" gutterBottom>
          Register
        </Typography>
      </Box>
      
      {error && <Alert severity="error">{error}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}

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
        <TextField
          label="Username"
          name="username"
          fullWidth
          variant="outlined"
          onChange={handleChange}
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          variant="outlined"
          onChange={handleChange}
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          variant="outlined"
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="primary" size="large">
          Register
        </Button>
      </Box>
    </Container>
  );
}

export default Register;
