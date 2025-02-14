import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loginUser, setLoginUser] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const deCodeJwtValue = jwtDecode(localStorage.getItem("token") || null)


  const fetchCurrentUserDetails = async (deCodeJwtValue) => {
    try {
      setIsFetching(true); // Prevent duplicate API calls
      const response = await axios.get(`http://localhost:5000/api/users/${deCodeJwtValue.id}`);
      if (response.data) {
        setLoginUser(response.data.data); // Set state with the object
      } else {
        console.warn("Invalid response format:", response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsFetching(false); // Reset flag
    }
  };

  // Fetch once on component mount
  useEffect(() => {
    if(!loginUser && deCodeJwtValue){
        fetchCurrentUserDetails(deCodeJwtValue);
    }
  }, [deCodeJwtValue, loginUser]);

  return (
    <UserContext.Provider value={{ loginUser, isFetching }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for consuming the context
export const useUser = () => useContext(UserContext);
