import React, { useState } from "react";
import { Container, Typography, Box, List, ListItem, ListItemText, Chip, Pagination, Paper } from "@mui/material";

function WinHistory() {
  // Dummy Data for Winning and Betting History
  const historyData = [
    { roundNo: "R1234", betColor: "Red", winningColor: "Red", amount: 5000, betAmount: 1000 },
    { roundNo: "R1235", betColor: "Green", winningColor: "Red", amount: 0, betAmount: 1200 },
    { roundNo: "R1236", betColor: "Blue", winningColor: "Blue", amount: 8000, betAmount: 2000 },
    { roundNo: "R1237", betColor: "Red", winningColor: "Green", amount: 0, betAmount: 1500 },
    { roundNo: "R1238", betColor: "Green", winningColor: "Green", amount: 3000, betAmount: 900 },
    { roundNo: "R1239", betColor: "Red", winningColor: "Blue", amount: 0, betAmount: 1100 },
    { roundNo: "R1240", betColor: "Blue", winningColor: "Green", amount: 2500, betAmount: 800 },
    { roundNo: "R1241", betColor: "Green", winningColor: "Red", amount: 0, betAmount: 700 },
    { roundNo: "R1242", betColor: "Red", winningColor: "Red", amount: 6000, betAmount: 1400 },
    { roundNo: "R1243", betColor: "Blue", winningColor: "Blue", amount: 5000, betAmount: 1200 },
  ];

  // Pagination State
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(historyData.length / itemsPerPage);

  // Paginate the data
  const paginatedData = historyData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Container maxWidth="sm" sx={{ mt: 2, pb: 8 }}>
      <Typography variant="h6" fontWeight="bold" textAlign="center" mb={2}>
        Win History
      </Typography>

      {/* 📜 List of Win History */}
      <Paper elevation={3} sx={{ borderRadius: 2, p: 1 }}>
        <List>
          {paginatedData.map((row, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={`Round No: ${row.roundNo}`}
                secondary={
                  <>
                    <Box display="flex" gap={1} alignItems="center" mt={1}>
                      <Chip label={`Bet: ${row.betColor}`} sx={{ bgcolor: row.betColor.toLowerCase(), color: "white", fontWeight: "bold" }} />
                      <Chip label={`Win: ${row.winningColor}`} sx={{ bgcolor: row.winningColor.toLowerCase(), color: "white", fontWeight: "bold" }} />
                    </Box>
                    <Typography variant="body2" mt={1}><strong>Bet Amount:</strong> ₹{row.betAmount.toLocaleString()}</Typography>
                    <Typography variant="body2"><strong>Winning Amount:</strong> ₹{row.amount.toLocaleString()}</Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* 📍 Pagination */}
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination count={totalPages} page={page} onChange={(e, value) => setPage(value)} color="primary" />
      </Box>
    </Container>
  );
}

export default WinHistory;
