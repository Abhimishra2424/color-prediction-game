import { createContext, useReducer, useEffect, useContext } from "react";
import axios from "axios";

// Initial Auth State
const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
};

// Reducer Function
const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
        case "REGISTER_SUCCESS":
            return { 
                ...state, 
                user: action.payload.user, 
                token: action.payload.token, 
                loading: false,
                error: null
            };
        case "LOGIN_ERROR":
        case "REGISTER_ERROR":
            return { ...state, error: action.payload, loading: false };
        case "LOGOUT":
            return { user: null, token: null, loading: false, error: null };
        default:
            return state;
    }
};

// Context Create
export const AuthContext = createContext();

// Custom Hook for using Auth
export const useAuth = () => useContext(AuthContext);


// AuthProvider Component
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const storedToken = localStorage.getItem("token");
        if (storedUser && storedToken) {
            dispatch({ type: "LOGIN_SUCCESS", payload: { user: storedUser, token: storedToken } });
        }
    }, []);

    // Login Function
    const loginUser = async (email, password) => {
        try {
            const res = await axios.post("http://localhost:5000/api/users/login", { email, password });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify({ email })); // Storing user email

            dispatch({ 
                type: "LOGIN_SUCCESS", 
                payload: { user: { email }, token: res.data.token } 
            });

        } catch (error) {
            dispatch({ type: "LOGIN_ERROR", payload: error.response?.data?.message || "Login failed" });
        }
    };

    // Register Function
    const registerUser = async (username, email, password) => {
        try {
            const res = await axios.post("http://localhost:5000/api/users/register", { username, email, password });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.data));

            dispatch({ 
                type: "REGISTER_SUCCESS", 
                payload: { user: res.data.data, token: res.data.token } 
            });

        } catch (error) {
            dispatch({ type: "REGISTER_ERROR", payload: error.response?.data?.message || "Registration failed" });
        }
    };

    // Logout Function
    const logoutUser = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
    };

    return (
        <AuthContext.Provider value={{ ...state, loginUser, registerUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};