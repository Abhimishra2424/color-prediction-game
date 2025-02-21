import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";
import { API_URL } from "../path";

const RoundContext = createContext();

export const RoundProvider = ({ children }) => {
  
  const { logoutUser, loginUser } = useAuth()
  const [currentRound, setCurrentRound] = useState(null);
  const [gameHistory, setGameHistory] = useState(null)

  const [isFetching, setIsFetching] = useState(false);

  const fetchCurrentRound = async () => {
    try {
      setIsFetching(true); // Prevent duplicate API calls
      const response = await axios.get(`${API_URL}/api/rounds/round`, {
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
      if (error.response.data.message === `Forbidden: Invalid or expired token`) {
        logoutUser()
      }
      console.log('error.response.data.message', error.response.data.message)
    } finally {
      setIsFetching(false); // Reset flag
    }
  };

  const getGameHistroy = async () => {
    try {

      const response = await axios.get(`${API_URL}/api/rounds/completed`, {
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

  const checkPetResult = async () => {

    if(!localStorage.getItem("bet_id")) {
      return
    }

    try {
      let payload = {
        user_id: loginUser?.id,
        round_id: currentRound?.id,
        bet_id: localStorage.getItem("bet_id")
      }
      const response = await axios.post(`${API_URL}/api/bet/check-result`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 2000,
        });
        //  reset bet_id
        localStorage.removeItem("bet_id");
      } else {
        toast.error(response.data.message, {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  }

  // Fetch once on component mount
  useEffect(() => {
    fetchCurrentRound();
    getGameHistroy();
    checkPetResult();
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
          checkPetResult(); // fetch only when needed
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentRound?.end_time]); // Depend only on `end_time`

  return (
    <RoundContext.Provider value={{ currentRound, gameHistory, fetchCurrentRound, getGameHistroy }}>
      {children}
    </RoundContext.Provider>
  );
};

// Custom hook for consuming the context
export const useRound = () => useContext(RoundContext);
