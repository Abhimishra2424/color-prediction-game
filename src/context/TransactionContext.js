import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../path";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    const fetchTransactions = async () => {
        if (isFetching) return; // Prevent multiple calls

        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found! Redirecting to login...");
            return;
        }

        try {
            setIsFetching(true);

            const response = await axios.post(
                `${API_URL}/api/transactions/get`,
                {}, // Keep it only if required by API
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.data?.transactions) {
                setTransactions(response.data.transactions);
            } else {
                console.warn("Invalid response format:", response.data);
                setTransactions([]); // Reset transactions on invalid response
            }
        } catch (error) {
            console.error("Error fetching transactions:", error.response?.data || error.message);
            setTransactions([]); // Reset transactions on error
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchTransactions(); // Call only once on mount
    }, []);

    return (
        <TransactionContext.Provider value={{ transactions, isFetching, fetchTransactions }}>
            {children}
        </TransactionContext.Provider>
    );
};

// Custom hook for consuming the context
export const useTransaction = () => useContext(TransactionContext);
