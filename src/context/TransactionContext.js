import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    const fetchTransactions = async () => {
        if (isFetching) return; // Prevent multiple calls

        try {
            setIsFetching(true);

            const response = await axios.post("http://localhost:5000/api/transactions/get", {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

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
    }, []); // Empty dependency array prevents infinite loops

    return (
        <TransactionContext.Provider value={{ transactions, isFetching, fetchTransactions }}>
            {children}
        </TransactionContext.Provider>
    );
};

// Custom hook for consuming the context
export const useTransaction = () => useContext(TransactionContext);
