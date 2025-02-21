import React, { useState } from "react";
import { Button, Container, Typography, CircularProgress } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../path";

const RoundStart = () => {
  const [loading, setLoading] = useState(false);

  const handleStartRound = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("No token found! Please log in.", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/api/rounds/create`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(response?.data?.message || "Round started successfully!", {
        position: "top-center",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to start round!", {
        position: "top-center",
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Start the First Round
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleStartRound}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Start Round"}
      </Button>
    </Container>
  );
};

export default RoundStart;
