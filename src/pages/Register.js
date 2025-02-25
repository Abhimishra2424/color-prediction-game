import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const { registerUser, error, user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await registerUser(form.username, form.email, form.password);
    setLoading(false);

    if (success) {
      setSuccessMessage("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1e3c72, #2a5298)",
        p: 2,
      }}
    >
      <Container maxWidth="xs">
        <Card sx={{ borderRadius: 3, boxShadow: 6, overflow: "hidden" }}>
          <CardContent sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h4" fontWeight="bold" color="primary">
              Color Prediction
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" mb={2}>
              Create an account
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                textAlign: "left",
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{
                  bgcolor: "#1976d2",
                  "&:hover": { bgcolor: "#1565c0" },
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Register"}
              </Button>
            </Box>

            {/* Login Link */}
            <Typography variant="body2" mt={2}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#1976d2", fontWeight: "bold", textDecoration: "none" }}>
                Login
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default Register;
