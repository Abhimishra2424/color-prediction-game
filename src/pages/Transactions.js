import React, { useState } from "react";
import { Container, Typography, Box, Button, Grid, Card, CardContent, List, ListItem, ListItemText, Chip } from "@mui/material";

function Transactions() {
  const [viewType, setViewType] = useState("card"); // Toggle between 'card' and 'list'

  // Dummy Transaction Data
  const transactions = [
    { txnNo: "TXN12345", type: "Debit", amount: 1500 },
    { txnNo: "TXN67890", type: "Credit", amount: 2000 },
    { txnNo: "TXN54321", type: "Debit", amount: 500 },
    { txnNo: "TXN98765", type: "Credit", amount: 3500 },
    { txnNo: "TXN11122", type: "Debit", amount: 1200 },
    { txnNo: "TXN22233", type: "Credit", amount: 4500 },
    { txnNo: "TXN33344", type: "Debit", amount: 700 },
    { txnNo: "TXN44455", type: "Credit", amount: 3900 },
  ];

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      {/* Page Title & Toggle View Button (Fixed Section) */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" fontWeight="bold">Transactions</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setViewType(viewType === "card" ? "list" : "card")}
        >
          {viewType === "card" ? "List View" : "Card View"}
        </Button>
      </Box>

      {/* Scrollable Transaction Section */}
      <Box
        sx={{
          maxHeight: "400px", // Limit height for scrollable area
          overflowY: "auto", // Enable vertical scrolling
          borderRadius: 2,
          boxShadow: 2,
          p: 2,
          bgcolor: "#f9f9f9",
        }}
      >
        {/* Card View */}
        {viewType === "card" ? (
          <Grid container spacing={2}>
            {transactions.map((txn, index) => (
              <Grid item xs={12} key={index}>
                <Card sx={{ boxShadow: 2 }}>
                  <CardContent>
                    <Typography variant="body1"><strong>Txn No:</strong> {txn.txnNo}</Typography>
                    <Typography variant="body1">
                      <strong>Type:</strong>{" "}
                      <Chip
                        label={txn.type}
                        sx={{
                          bgcolor: txn.type === "Debit" ? "green" : "red",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      />
                    </Typography>
                    <Typography variant="body1"><strong>Amount:</strong> ₹{txn.amount}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          // List View
          <List>
            {transactions.map((txn, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={`Txn No: ${txn.txnNo}`}
                  secondary={`Amount: ₹${txn.amount}`}
                />
                <Chip
                  label={txn.type}
                  sx={{
                    bgcolor: txn.type === "Debit" ? "green" : "red",
                    color: "white",
                    fontWeight: "bold",
                  }}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
}

export default Transactions;
