import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GameHome from "./pages/GameHome";
import WinHistory from "./pages/WinHistory";
import ProfilePage from "./pages/ProfilePage";
import AddMoney from "./pages/AddMoney";
import Withdraw from "./pages/Withdraw";
import UpdatePassword from "./pages/UpdatePassword";
import Transaction from "./pages/Transactions";
import { AuthProvider } from "./context/AuthContext";
import { RoundProvider } from "./context/RoundContext";
import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <AuthProvider>
      <UserProvider >
        <RoundProvider>
          <Router>
            <Routes>
              {/* ✅ Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* ✅ Protected Routes with Layout */}
              <Route element={<Layout />}>
                <Route path="/" element={<PrivateRoute><GameHome /></PrivateRoute>} />
                <Route path="/win" element={<PrivateRoute><WinHistory /></PrivateRoute>} />
                <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
                <Route path="/add-money" element={<PrivateRoute><AddMoney /></PrivateRoute>} />
                <Route path="/withdraw" element={<PrivateRoute><Withdraw /></PrivateRoute>} />
                <Route path="/update-password" element={<PrivateRoute><UpdatePassword /></PrivateRoute>} />
                <Route path="/transactions" element={<PrivateRoute><Transaction /></PrivateRoute>} />
              </Route>
            </Routes>
          </Router>
        </RoundProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
