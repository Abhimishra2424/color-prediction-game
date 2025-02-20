import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  List,
  Chip,
  Paper,
  CircularProgress,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { useTransaction } from "../context/TransactionContext";

function Transactions() {
  const { transactions, isFetching, fetchTransactions } = useTransaction();

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Calculate Total Balance
  const totalBalance = transactions.reduce((acc, txn) => {
    return txn.type.toLowerCase() === "credit" ? acc + parseFloat(txn.amount) : acc - parseFloat(txn.amount);
  }, 0);

  return (
    <Container maxWidth="sm" sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Sticky Header */}
      <Box sx={{ display: "flex", alignItems: "center", p: 2, position: "sticky", top: 0, bgcolor: "white", zIndex: 10, borderBottom: "1px solid #ddd" }}>
        <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
          <MdArrowBack size={28} />
        </Link>
        <Typography variant="h6" sx={{ ml: 2, fontWeight: "bold" }}>Transactions</Typography>
      </Box>

      {/* Total Balance */}
      <Paper sx={{ p: 2, m: 2, textAlign: "center", borderRadius: 2, bgcolor: "#1976D2", color: "white", fontWeight: "bold" }}>
        <Typography variant="h5">Total Balance</Typography>
        <Typography variant="h6">₹{totalBalance.toLocaleString()}</Typography>
      </Paper>

      {/* Transactions List */}
      <Box sx={{ flex: 1, overflowY: "auto", p: 2, bgcolor: "#f9f9f9", borderRadius: 2 }}>
        {isFetching ? (
          <Box display="flex" justifyContent="center" mt={3}>
            <CircularProgress />
          </Box>
        ) : transactions.length === 0 ? (
          <Typography textAlign="center" color="gray" mt={3}>
            No transactions found.
          </Typography>
        ) : (
          <List>
            {transactions.map((txn) => (
              <Card key={txn.transaction_number} sx={{ mb: 2, borderRadius: 2, boxShadow: 3 }}>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={8}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Txn No: {txn.transaction_number}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Amount: ₹{parseFloat(txn.amount).toFixed(2)} | Source: {txn.source}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Status: <strong>{txn.status}</strong>
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Created: {new Date(txn.cdate).toLocaleString()}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Updated: {new Date(txn.udate).toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} textAlign="right">
                      <Chip
                        label={txn.type.charAt(0).toUpperCase() + txn.type.slice(1)}
                        sx={{
                          bgcolor: txn.type.toLowerCase() === "debit" ? "#e57373" : "#81c784",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
}

export default Transactions;