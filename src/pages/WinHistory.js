import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Chip,
  Pagination,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { API_URL } from "../path";

function WinHistory() {
  const [historyData, setHistoryData] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/bet/get-all-bets`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (response.data.success) {
          const { bets } = response.data;
          setHistoryData(
            bets.map((bet) => ({
              roundNo: bet.round.round_no,
              betColor: bet.bet_color,
              winningColor: bet.round.winning_color,
              betAmount: parseFloat(bet.bet_amount),
              winningAmount: bet.bet_type === "win" ? parseFloat(bet.bet_amount) * 2 : 0, // If "win", double the amount
            }))
          );

          // Extract Wallet Balance
          if (bets.length > 0 && bets[0].Wallet) {
            setTotalBalance(bets[0].Wallet.balance);
          }
        } else {
          setError("Failed to fetch betting history.");
        }
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const totalPages = Math.ceil(historyData.length / itemsPerPage);
  const paginatedData = historyData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "calc(100vh - 56px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ✅ Show Loading */}
      {loading && (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      )}

      {/* ✅ Show Error */}
      {error && (
        <Box mt={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {!loading && !error && (
        <>
          {/* ✅ Total Balance Display */}
          <Box
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: "#1976D2",
              color: "white",
              borderRadius: 2,
              mb: 2,
              mt: 5,
            }}
          >
            <Typography variant="body1" sx={{ mt: 1, fontWeight: "bold" }}>
              Total Balance: ₹{totalBalance.toLocaleString()}
            </Typography>
          </Box>

          {/* ✅ Scrollable Transactions List */}
          <Paper elevation={2} sx={{ flex: 1, overflowY: "auto", p: 2, pb: 2 }}>
            <List>
              {paginatedData.map((row, index) => (
                <ListItem key={index} divider>
                  <ListItemText
                    primary={`Round No: ${row.roundNo}`}
                    secondary={
                      <>
                        <Box display="flex" gap={1} alignItems="center" mt={1}>
                          <Chip
                            label={`Bet: ${row.betColor}`}
                            sx={{ bgcolor: row.betColor.toLowerCase(), color: "white", fontWeight: "bold" }}
                          />
                          <Chip
                            label={`Win: ${row.winningColor}`}
                            sx={{ bgcolor: row.winningColor.toLowerCase(), color: "white", fontWeight: "bold" }}
                          />
                        </Box>
                        <Typography variant="body2" mt={1}>
                          <strong>Bet Amount:</strong> ₹{row.betAmount.toLocaleString()}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Winning Amount:</strong> ₹{row.winningAmount.toLocaleString()}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* ✅ Pagination */}
          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination count={totalPages} page={page} onChange={(e, value) => setPage(value)} color="primary" />
          </Box>
        </>
      )}
    </Container>
  );
}

export default WinHistory;
