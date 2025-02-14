import React, { useState } from "react";
import { Container, Typography, Box, TextField, Button, Paper } from "@mui/material";
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

function AddMoney() {
  const upiId = "user@upi";
  const [amount, setAmount] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [transactionNumber, setTransactionNumber] = useState("");
  const [source, setSource] = useState("");

  const handleSubmit = () => {
    if (!amount || !transactionId || !transactionNumber || !source) {
      alert("Please fill in all fields.");
      return;
    }
    console.log("Transaction Submitted:", { amount, transactionId, transactionNumber, source });
    // Send details to backend for verification
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "calc(100vh - 56px)", // Adjust for bottom navigation
        display: "flex",
        flexDirection: "column",
      }}
    >
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
        <Typography variant="h6" sx={{ ml: 2, fontWeight: "bold" }}>Add Money</Typography>
      </Box>

      {/* Scrollable Content */}
      <Box sx={{ flex: 1, overflowY: "auto", p: 2, pb: 10 }}> {/* Extra padding for bottom nav */}
        {/* UPI ID Section */}
        <Paper sx={{ p: 2, mb: 2, bgcolor: "#1976D2", color: "white", borderRadius: 2, textAlign: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>Send Money to</Typography>
          <Typography variant="body1" sx={{ fontSize: "18px", fontWeight: "bold", mt: 1 }}>
            {upiId}
          </Typography>
        </Paper>

        {/* QR Code */}
        <Box display="flex" justifyContent="center" my={2} sx={{ p: 2, bgcolor: "#f5f5f5", borderRadius: 2 }}>
          <QRCode value={upiId} size={180} />
        </Box>

        {/* Transaction Inputs */}
        <Paper sx={{ p: 2, borderRadius: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>Enter Amount</Typography>
          <TextField
            placeholder="Enter Amount"
            fullWidth
            variant="outlined"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            sx={{ mb: 2, bgcolor: "white" }}
          />

          <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>Enter Transaction ID</Typography>
          <TextField
            placeholder="Enter UPI Transaction ID"
            fullWidth
            variant="outlined"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            sx={{ mb: 2, bgcolor: "white" }}
          />

          <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>Enter Transaction Number</Typography>
          <TextField
            placeholder="Enter Transaction Number"
            fullWidth
            variant="outlined"
            value={transactionNumber}
            onChange={(e) => setTransactionNumber(e.target.value)}
            sx={{ mb: 2, bgcolor: "white" }}
          />

          <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>Enter Source</Typography>
          <TextField
            placeholder="Enter Source (e.g., Add Money, Withdrawal)"
            fullWidth
            variant="outlined"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            sx={{ mb: 2, bgcolor: "white" }}
          />
        </Paper>
      </Box>

      {/* Fixed Submit Button ABOVE Bottom Navigation */}
      <Box sx={{ p: 2, bgcolor: "white", borderTop: "1px solid #ddd", bottom: 56}}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ py: 1.5, fontSize: "16px", fontWeight: "bold" }}
          onClick={handleSubmit}
        >
          Submit Transaction
        </Button>
      </Box>
      
    </Container>
  );
}

export default AddMoney;
