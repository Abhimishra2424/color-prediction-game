import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../path";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loginUser, setLoginUser] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const fetchCurrentUserDetails = async () => {
    const token = localStorage.getItem("token");

    if (isFetching) return; // Prevent multiple calls

    if (!token) {
      console.error("No token found! Redirecting to login...");
      return;
    }

    try {
      setIsFetching(true); // Prevent duplicate API calls

      const response = await axios.get(`${API_URL}/api/users/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.data) {
        setLoginUser(response.data.data); // Set state with the user data
      } else {
        console.warn("Invalid response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching user details:", error.response?.data || error.message);
      setLoginUser(null); // Reset state in case of an error
    } finally {
      setIsFetching(false); // Reset flag
    }
  };

  // Fetch once on component mount
  useEffect(() => {
    fetchCurrentUserDetails();
  }, []);

  return (
    <UserContext.Provider value={{ loginUser, isFetching, setLoginUser, fetchCurrentUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for consuming the context
export const useUser = () => useContext(UserContext);
