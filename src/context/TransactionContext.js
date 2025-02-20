import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    const fetchTransactions = async () => {
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
            }
        } catch (error) {
            console.error("Error fetching transactions:", error.response?.data || error.message);
        } finally {
            setIsFetching(false);
        }
    }

    useEffect(() => {
        if(transactions.length === 0 && !isFetching) {
            fetchTransactions();
        }
    }, [isFetching, transactions.length]);

    return (
        <TransactionContext.Provider value={{ transactions, isFetching, fetchTransactions }}>
            {children}
        </TransactionContext.Provider>
    );
};

// Custom hook for consuming the context
export const useTransaction = () => useContext(TransactionContext);
