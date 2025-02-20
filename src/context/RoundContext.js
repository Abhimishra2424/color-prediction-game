import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

const RoundContext = createContext();

export const RoundProvider = ({ children }) => {
  const  {logoutUser}  = useAuth()
  const [currentRound, setCurrentRound] = useState(null);
  const [gameHistory, setGameHistory] = useState(null)

  const [isFetching, setIsFetching] = useState(false);

  const fetchCurrentRound = async () => {
    try {
      setIsFetching(true); // Prevent duplicate API calls
      const response = await axios.get("http://localhost:5000/api/rounds/round", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data && response.data.round_no) {
        setCurrentRound(response.data); // Set state with the object
      } else {
        toast.warn("Invalid response format", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      if(error.response.data.message === `Forbidden: Invalid or expired token`){
        logoutUser()
      }
      console.log('error.response.data.message', error.response.data.message)
    } finally {
      setIsFetching(false); // Reset flag
    }
  };

  const getGameHistroy = async () =>{
    try {
     
      const response = await axios.get("http://localhost:5000/api/rounds/completed", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data) {
        setGameHistory(response.data); 
      } else {
        toast.warn("Invalid response format", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } finally {
      
    }
  }

  // Fetch once on component mount
  useEffect(() => {
    fetchCurrentRound();
    getGameHistroy()
  }, []);

  // Poll every 5 seconds without an infinite loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isFetching && currentRound?.end_time) {
        const endTime = new Date(currentRound.end_time).getTime();
        const now = new Date().getTime();

        if (now > endTime) {
          fetchCurrentRound(); // Fetch only when needed
          getGameHistroy(); // Fetch only when needed
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentRound?.end_time]); // Depend only on `end_time`

  return (
    <RoundContext.Provider value={{ currentRound, gameHistory, fetchCurrentRound , getGameHistroy }}>
      {children}
    </RoundContext.Provider>
  );
};

// Custom hook for consuming the context
export const useRound = () => useContext(RoundContext);
