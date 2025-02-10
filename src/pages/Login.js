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

function Login() {
  const [loginType, setLoginType] = useState("email");
  const [form, setForm] = useState({ identifier: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLoginTypeChange = (e) => {
    setLoginType(e.target.value);
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
        <Button type="submit" variant="contained" color="primary" size="large">
          Login
        </Button>
      </Box>
    </Container>
  );
}

export default Login;
