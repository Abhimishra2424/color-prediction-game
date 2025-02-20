import React, { useEffect } from "react";
import { Container, Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { MdAttachMoney, MdOutlineLock, MdMoneyOff, MdAccountCircle, MdReceipt, MdCheckCircle, MdPeople, MdPlayCircle, MdLogout } from "react-icons/md";
import { useUser } from "../context/UserContext";
import { useTransaction } from "../context/TransactionContext";

function ProfilePage() {
  const { loginUser, setLoginUser, fetchCurrentUserDetails } = useUser();
    const { fetchTransactions } = useTransaction();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactions();
    fetchCurrentUserDetails()
  }, []);

  // Default User Options
  const userOptions = [
    { name: "Add Money", icon: <MdAttachMoney size={24} />, path: "/add-money" },
    { name: "Withdraw", icon: <MdMoneyOff size={24} />, path: "/withdraw" },
    { name: "Update Password", icon: <MdOutlineLock size={24} />, path: "/update-password" },
    { name: "Transaction", icon: <MdReceipt size={24} />, path: "/transactions" },
  ];

  // Admin Options (Shown Only if loginUser.role === "admin")
  const adminOptions = [
    { name: "Approve Menu", icon: <MdCheckCircle size={24} />, path: "/approve" },
    { name: "Users List", icon: <MdPeople size={24} />, path: "/users" },
    { name: "Round Start", icon: <MdPlayCircle size={24} />, path: "/round-start" },
  ];

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from storage
    localStorage.removeItem("user"); // Remove token from storage
    setLoginUser(null); // Clear user context
    navigate("/login"); // Redirect to login page
  };

  return (
    <Container maxWidth="sm"
      sx={{
        height: "calc(100vh - 56px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* User Info */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "#1976D2",
          color: "white",
          borderRadius: 2,
          mb: 2,
          mt: 5,
        }}
      >
        <MdAccountCircle size={50} style={{ marginBottom: 8 }} />
        <Typography variant="h6">{loginUser?.username}</Typography>
        <Typography variant="body1" sx={{ mt: 1, fontWeight: "bold" }}>
          Total Amount: ₹{loginUser?.wallet?.balance}
        </Typography>
      </Box>

      {/* Scrollable Content */}
      <Box sx={{ flex: 1, overflowY: "auto", p: 2, pb: 10 }}>
        <List>
          {userOptions.map((option, index) => (
            <React.Fragment key={index}>
              <Link to={option.path} style={{ textDecoration: "none", color: "inherit" }}>
                <ListItem button sx={{ "&:hover": { bgcolor: "#f5f5f5" } }}>
                  <ListItemIcon>{option.icon}</ListItemIcon>
                  <ListItemText primary={option.name} />
                </ListItem>
              </Link>
              {index < userOptions.length - 1 && <Divider />}
            </React.Fragment>
          ))}

          {/* Admin Menu (Only for Admins) */}
          {loginUser?.role === "admin" && (
            <>
              <Divider sx={{ my: 1 }} />
              {adminOptions.map((option, index) => (
                <React.Fragment key={index}>
                  <Link to={option.path} style={{ textDecoration: "none", color: "inherit" }}>
                    <ListItem button sx={{ "&:hover": { bgcolor: "#f5f5f5" } }}>
                      <ListItemIcon>{option.icon}</ListItemIcon>
                      <ListItemText primary={option.name} />
                    </ListItem>
                  </Link>
                  {index < adminOptions.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </>
          )}
        </List>
      </Box>

      {/* Logout Button */}
      <Box sx={{ textAlign: "center", pb: 3 }}>
        <Button variant="contained" color="error" onClick={handleLogout} startIcon={<MdLogout size={24} />}>
          Logout
        </Button>
      </Box>
    </Container>
  );
}

export default ProfilePage;
