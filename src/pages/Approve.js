import React, { useEffect, useState } from "react";
import {
    Container,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Stack,
    useMediaQuery,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const Approve = () => {
    const isMobile = useMediaQuery("(max-width:600px)");
    const [transactions, setTransactions] = useState([]);

    // Fetch Transactions
    const fetchTransactions = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found! Redirecting to login...");
            return;
        }
        try {
            const response = await axios.get("http://localhost:5000/api/transactions/admin/all", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTransactions(response.data.transactions || []);
        } catch (error) {
            console.error("Error fetching transactions:", error.response?.data || error.message);
            setTransactions([]);
        } finally {

        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);


    // Handle Approve/Reject Action
    const handleAction = async (id, action) => {
        try {
            const url = action === "Approved"
                ? "http://localhost:5000/api/wallet/admin/approve-money"
                : "http://localhost:5000/api/wallet/admin/reject-money";
    
            const response = await axios.post(
                url,
                { request_id: id }, 
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );
    
            // Show success message
            toast.success(response?.data?.message || `${action} successful!`, {
                position: "top-center",
                autoClose: 2000,
            });
    
            // Update UI after approval/rejection
            setTransactions(transactions.map((tx) =>
                tx.id === id ? { ...tx, status: action } : tx
            ));
        } catch (error) {
            console.error(`Error ${action.toLowerCase()}ing transaction:`, error.response?.data || error.message);
            
            // Show error message
            toast.error(error.response?.data?.message || `Failed to ${action.toLowerCase()}!`, {
                position: "top-center",
                autoClose: 2000,
            });
        }
    };
    
    return (
        <Container maxWidth="md" sx={{ mt: 3, pb: 5 }}>
            <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
                Admin Approval Panel
            </Typography>

            <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                            <TableCell><strong>User</strong></TableCell>
                            <TableCell><strong>Amount</strong></TableCell>
                            <TableCell><strong>Type</strong></TableCell>
                            <TableCell><strong>Source</strong></TableCell>
                            <TableCell><strong>Transaction #</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                            <TableCell align="center"><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.length > 0 ? (
                            transactions.map((tx) => (
                                <TableRow key={tx.id}>
                                    <TableCell>{tx.user?.username || "N/A"}</TableCell>
                                    <TableCell>₹{tx.amount}</TableCell>
                                    <TableCell>{tx.type}</TableCell>
                                    <TableCell>{tx.source}</TableCell>
                                    <TableCell>{tx.transaction_number}</TableCell>
                                    <TableCell>
                                        <Typography
                                            color={tx.status === "Approved" ? "green" : tx.status === "Rejected" ? "red" : "orange"}
                                            fontWeight="bold"
                                        >
                                            {tx.status}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        {tx.status === "pending" ? (
                                            <Stack direction={isMobile ? "column" : "row"} spacing={1}>
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    size="small"
                                                    fullWidth={isMobile}
                                                    onClick={() => handleAction(tx.id, "Approved")}
                                                >
                                                    Approve
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    size="small"
                                                    fullWidth={isMobile}
                                                    onClick={() => handleAction(tx.id, "Rejected")}
                                                >
                                                    Reject
                                                </Button>
                                            </Stack>
                                        ) : (
                                            <Typography variant="body2" fontWeight="bold">
                                                {tx.status}
                                            </Typography>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    No transactions found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default Approve;
