import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const RoundContext = createContext();

export const RoundProvider = ({ children }) => {
  const [currentRound, setCurrentRound] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const fetchCurrentRound = async () => {
    try {
      setIsFetching(true); // Prevent duplicate API calls
      const response = await axios.get("http://localhost:5000/api/rounds/round", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      });

      if (response.data && response.data.round_no) {
        setCurrentRound(response.data); // Set state with the object
      } else {
        console.warn("Invalid response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching current round:", error);
    } finally {
      setIsFetching(false); // Reset flag
    }
  };

  // Fetch once on component mount
  useEffect(() => {
    fetchCurrentRound();
  }, []);


// Poll every 5 seconds without infinite loop
useEffect(() => {
  const interval = setInterval(() => {
    if (!isFetching && currentRound?.end_time) {
      const endTime = new Date(currentRound.end_time).getTime();
      const now = new Date().getTime();

      if (now > endTime) {
        fetchCurrentRound(); // Fetch only when needed
      }
    }
  }, 5000);

  return () => clearInterval(interval);
}, [currentRound?.end_time]); // Depend only on `end_time`

  return (
    <RoundContext.Provider value={{ currentRound }}>
      {children}
    </RoundContext.Provider>
  );
};

// Custom hook for consuming the context
export const useRound = () => useContext(RoundContext);
