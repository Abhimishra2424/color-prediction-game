import React from "react";
import { Container, Typography, Box, List, ListItem, ListItemText, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

function Transactions() {
  // Dummy Transaction Data
  const transactions = [
    { txnNo: "TXN12345", type: "Debit", amount: 1500 },
    { txnNo: "TXN67890", type: "Credit", amount: 2000 },
    { txnNo: "TXN54321", type: "Debit", amount: 500 },
    { txnNo: "TXN98765", type: "Credit", amount: 3500 },
    { txnNo: "TXN98765", type: "Credit", amount: 3500 },
    { txnNo: "TXN98765", type: "Credit", amount: 3500 },
  ];

  // Calculate Total Balance
  const totalBalance = transactions.reduce((acc, txn) => {
    return txn.type === "Credit" ? acc + txn.amount : acc - txn.amount;
  }, 0);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      {/* 🔙 Back Navigation */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
          <MdArrowBack size={28} />
        </Link>
        <Typography variant="h6" sx={{ ml: 2, fontWeight: "bold" }}>Transactions</Typography>
      </Box>

      {/* 💰 Total Balance Section */}
      <Box
        sx={{
          mb: 2,
          p: 2,
          borderRadius: 2,
          boxShadow: 2,
          bgcolor: "#f0f0f0",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Total Balance: ₹{totalBalance.toLocaleString()}
        </Typography>
      </Box>

      {/* 📜 Transactions List */}
      <Box sx={{ maxHeight: "400px", overflowY: "auto", borderRadius: 2, boxShadow: 2, p: 2, bgcolor: "#f9f9f9" }}>
        <List>
          {transactions.map((txn, index) => (
            <ListItem key={index} divider>
              <ListItemText primary={`Txn No: ${txn.txnNo}`} secondary={`Amount: ₹${txn.amount}`} />
              <Chip
                label={txn.type}
                sx={{
                  bgcolor: txn.type === "Debit" ? "red" : "green",
                  color: "white",
                  fontWeight: "bold",
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default Transactions;
