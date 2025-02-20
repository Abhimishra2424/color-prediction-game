import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { MdOutlineSportsEsports, MdTimer } from "react-icons/md"; // Icons
import { useRound } from "../context/RoundContext"; // Import the context
import { useTransaction } from "../context/TransactionContext";
import { useUser } from "../context/UserContext";

function GameHome() {
  const { currentRound, gameHistory, fetchCurrentRound , getGameHistroy } = useRound();
  const {  fetchTransactions } = useTransaction();
  const {  fetchCurrentUserDetails } = useUser();


  const now = new Date();
  const etime = new Date(currentRound?.end_time);
  const timeL = Math.floor((etime - now) / 1000);

  const [timeLeft, setTimeLeft] = useState(timeL);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5);

  // Fetch once on component mount
  useEffect(() => {
    fetchCurrentRound();
    getGameHistroy()
    fetchTransactions()
    fetchCurrentUserDetails()
  }, []);

  // Timer Countdown
  useEffect(() => {
    if (!currentRound) return;

    const interval = setInterval(() => {
      const now = new Date();
      const endTime = new Date(currentRound.end_time);
      const diff = Math.floor((endTime - now) / 1000);

      setTimeLeft(diff > 0 ? diff : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentRound]);

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 3, pb: 8 }}>
      {/* Header Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        bgcolor="#222"
        color="white"
        borderRadius={2}
        boxShadow={3}
      >
        <Typography
          variant="h6"
          sx={{ display: "flex", alignItems: "center", fontSize: { xs: 16, md: 20 } }}
        >
          <MdOutlineSportsEsports size={24} style={{ marginRight: 8 }} /> Round: {currentRound?.round_no || "N/A"}
        </Typography>
        <Typography
          variant="h6"
          sx={{ display: "flex", alignItems: "center", fontSize: { xs: 16, md: 20 } }}
        >
          <MdTimer size={24} style={{ marginRight: 8 }} /> {timeLeft ? timeLeft : ""}s
        </Typography>
      </Box>

      {/* Color Box Selection */}
      <Box mt={4}>
        <Typography variant="h6" sx={{ fontSize: { xs: 14, md: 18 } }} gutterBottom>
          Pick a Color
        </Typography>
        <Grid container spacing={2}>
          {["red", "green", "black", "blue", "orange", "pink"].map((color) => (
            <Grid item xs={4} key={color}>
              <Box
                sx={{
                  backgroundColor: color,
                  height: { xs: 80, md: 100 },
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: { xs: 14, md: 18 },
                  cursor: "pointer",
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.05)", opacity: 0.9 },
                }}
              >
                {color.toUpperCase()}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Game History Table */}
      <Box mt={4}>
        <Typography variant="h6" sx={{ fontSize: { xs: 14, md: 18 } }} gutterBottom>
          Game History
        </Typography>
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#444" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>
                  Round
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>
                  Winning Color
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gameHistory?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.round_no}>
                    <TableCell sx={{ textAlign: "center", fontSize: { xs: 12, md: 16 } }}>
                      {row?.round_no}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", fontWeight:"bold", color: row?.winning_color, fontSize: { xs: 12, md: 16 } }}>
                      {row?.winning_color}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={gameHistory?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          rowsPerPageOptions={[]} // Hide "rows per page" option
          sx={{
            fontSize: { xs: 12, md: 14 },
            mt: 2,
            ".MuiTablePagination-root": {
              display: "flex",
              justifyContent: "center",
            },
          }}
        />
      </Box>
    </Container>
  );
}

export default GameHome;
