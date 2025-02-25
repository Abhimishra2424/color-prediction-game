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
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import { useAuth } from "../context/AuthContext";

function Login() {
  const { loginUser, user } = useAuth();
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState("email");
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", msg: "" });

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLoginTypeChange = (e) => {
    setLoginType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ type: "", msg: "" });

    const result = await loginUser(form.identifier, form.password);

    if (result.success) {
      setAlert({ type: "success", msg: result.message });
      setTimeout(() => navigate("/"), 1500);
    } else {
      setAlert({ type: "error", msg: result.message });
    }

    setLoading(false);
    setTimeout(() => setAlert({ type: "", msg: "" }), 3000);
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
              Sign in to your account
            </Typography>

            {alert.msg && (
              <Alert severity={alert.type} sx={{ mb: 2 }}>
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
                textAlign: "left",
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
                {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Login"}
              </Button>
            </Box>

            {/* Register Link */}
            <Typography variant="body2" mt={2}>
              Don't have an account?{" "}
              <Link to="/register" style={{ color: "#1976d2", fontWeight: "bold", textDecoration: "none" }}>
                Register
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default Login;