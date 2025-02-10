import React, { useState } from "react";
import { Container, Typography, Box, TextField, Button, Paper } from "@mui/material";
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

function AddMoney() {
  const upiId = "user@upi";
  const [transactionId, setTransactionId] = useState("");

  const handleSubmit = () => {
    if (transactionId.trim() === "") {
      alert("Please enter a valid transaction ID.");
      return;
    }
    console.log("Transaction ID Submitted:", transactionId);
    // Send transactionId to backend for verification
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 3 }}>
      {/* Back Navigation */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
          <MdArrowBack size={28} />
        </Link>
        <Typography variant="h6" sx={{ ml: 2, fontWeight: "bold" }}>Add Money</Typography>
      </Box>

      {/* UPI ID Section */}
      <Paper sx={{ p: 2, mb: 2, bgcolor: "#1976D2", color: "white", borderRadius: 2, textAlign: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>Send Money to</Typography>
        <Typography variant="body1" sx={{ fontSize: "18px", fontWeight: "bold", mt: 1 }}>
          {upiId}
        </Typography>
      </Paper>

      {/* QR Code */}
      <Box display="flex" justifyContent="center" my={3} sx={{ p: 2, bgcolor: "#f5f5f5", borderRadius: 2 }}>
        <QRCode value={upiId} size={180} />
      </Box>

      {/* Transaction ID Input */}
      <Paper sx={{ p: 2, mt: 2, borderRadius: 2 }}>
        <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
          Enter Transaction ID
        </Typography>
        <TextField
          placeholder="Enter UPI Transaction ID"
          fullWidth
          variant="outlined"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          sx={{ mb: 2, bgcolor: "white" }}
        />

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ py: 1.5, fontSize: "16px", fontWeight: "bold" }}
          onClick={handleSubmit}
        >
          Submit Transaction ID
        </Button>
      </Paper>
    </Container>
  );
}

export default AddMoney;
