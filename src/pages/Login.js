import React, { useEffect, useState } from "react";
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
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from "../context/AuthContext"; // Import useAuth

function Login() {
  const { loginUser , user} = useAuth(); // Get login function from AuthContext
  const navigate = useNavigate(); // Initialize useNavigate
  const [loginType, setLoginType] = useState("email");
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", msg: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLoginTypeChange = (e) => {
    setLoginType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ type: "", msg: "" }); // Reset alert

    const result = await loginUser(form.identifier, form.password); // ✅ Wait for the result

    if (result.success) {
      setAlert({ type: "success", msg: result.message });

      // Redirect to / is called HomeGame page after a short delay
      setTimeout(() => {
        navigate("/");
      }, 1500);
      
    } else {
      setAlert({ type: "error", msg: result.message });
    }

    setLoading(false);

    // Hide alert after 3 seconds
    setTimeout(() => setAlert({ type: "", msg: "" }), 3000);
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
          Login
        </Typography>
      </Box>

      {alert.msg && (
        <Alert severity={alert.type} sx={{ mb: 2, textAlign: "center" }}>
          {alert.msg}
        </Alert>
      )}

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
        <Button type="submit" variant="contained" color="primary" size="large" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </Box>
    </Container>
  );
}

export default Login;
