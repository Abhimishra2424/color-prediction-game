import React from "react";
import { Container, Typography, Box, List, ListItem, ListItemText, Chip, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

function Transactions() {
  // Dummy Transaction Data
  const transactions = [
    { txnNo: "TXN12345", type: "Debit", amount: 1500 },
    { txnNo: "TXN67890", type: "Credit", amount: 2000 },
    { txnNo: "TXN54321", type: "Debit", amount: 500 },
    { txnNo: "TXN98765", type: "Credit", amount: 3500 },
    { txnNo: "TXN11223", type: "Debit", amount: 700 },
    { txnNo: "TXN33445", type: "Credit", amount: 1200 },
    { txnNo: "TXN55678", type: "Credit", amount: 3000 },
  ];

  // Calculate Total Balance
  const totalBalance = transactions.reduce((acc, txn) => {
    return txn.type === "Credit" ? acc + txn.amount : acc - txn.amount;
  }, 0);

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
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
        <Typography variant="h6" sx={{ ml: 2, fontWeight: "bold" }}>Transactions</Typography>
      </Box>

      {/* Total Balance */}
      <Paper
        sx={{
          p: 2,
          m: 2,
          textAlign: "center",
          borderRadius: 2,
          bgcolor: "#1976D2",
          color: "white",
          fontWeight: "bold",
        }}
      >
        <Typography variant="h6">Total Balance: ₹{totalBalance.toLocaleString()}</Typography>
      </Paper>

      {/* Scrollable Transactions List */}
      <Box sx={{ flex: 1, overflowY: "auto", p: 2, bgcolor: "#f9f9f9", borderRadius: 2 }}>
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
