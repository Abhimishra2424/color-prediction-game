import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

function Register() {
  const [form, setForm] = useState({ email: "", phone: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

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
          label="Email"
          name="email"
          fullWidth
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          label="Phone Number"
          name="phone"
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
        <Button type="submit" variant="contained" color="primary" size="large">
          Register
        </Button>
      </Box>
    </Container>
  );
}

export default Register;
