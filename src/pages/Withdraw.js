import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Box, TextField, Button, Alert, Paper } from "@mui/material";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { API_URL } from "../path";

const Withdraw = () => {
  const { loginUser } = useUser();
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (loginUser && loginUser.wallet && loginUser.wallet.balance) {
      setBalance(loginUser.wallet.balance);
    } else {
      setBalance(0);
    }
  }, [loginUser]);

  const handleWithdraw = async () => {
    setError("");
    setSuccess("");

    const withdrawAmount = parseFloat(amount);

    if (isNaN(withdrawAmount) || withdrawAmount < 2000) {
      setError("Minimum withdrawal amount is ₹2000.");
      return;
    }

    if (withdrawAmount > balance) {
      setError("Insufficient balance.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/wallet/withdraw`,
        { amount: withdrawAmount },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      if (response.data.success) {
        setSuccess(`Withdrawal of ₹${withdrawAmount} successful!`);
        setBalance(balance - withdrawAmount);
        setAmount("");
      } else {
        setError(response.data.message || "Withdrawal failed.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error processing withdrawal.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>

      {/* Sticky Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          position: "sticky",
          top: 0,
          bgcolor: "white",
          zIndex: 10,
          borderBottom: "1px solid #ddd",
        }}
      >
        <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
          <MdArrowBack size={28} />
        </Link>
        <Typography variant="h6" sx={{ ml: 2, fontWeight: "bold" }}>Withdraw</Typography>
      </Box>


      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Withdraw Funds
        </Typography>

        <Box display="flex" justifyContent="center" mb={2}>
          <Typography variant="h6" color="primary">
            Balance: ₹{balance.toLocaleString()}
          </Typography>
        </Box>

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <TextField
          label="Withdrawal Amount"
          type="number"
          fullWidth
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          sx={{ mt: 2 }}
          helperText="Minimum withdrawal amount is ₹2000."
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleWithdraw}
          sx={{ mt: 2 }}
          disabled={!amount || isNaN(amount) || amount < 2000 || amount > balance}
        >
          {amount < 2000
            ? "Enter at least ₹2000 to withdraw"
            : amount > balance
              ? "Insufficient balance"
              : "Withdraw"}
        </Button>
      </Paper>
    </Container>
  );
};

export default Withdraw;