import React from "react";
import { Container, Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { MdAttachMoney, MdOutlineLock, MdMoneyOff, MdAccountCircle, MdArrowBack, MdReceipt, MdCheckCircle, MdPeople, MdPlayCircle } from "react-icons/md"; // Icons
import { useUser } from "../context/UserContext";

function ProfilePage() {
  const { loginUser, isFetching } = useUser();

  const totalAmount = 5000; // Replace with actual balance from backend

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

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      {/* Back Navigation */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <MdArrowBack size={28} />
        </Link>
        <Typography variant="h6" sx={{ ml: 2, fontWeight: "bold" }}>Home</Typography>
      </Box>

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
        }}
      >
        <MdAccountCircle size={50} style={{ marginBottom: 8 }} />
        <Typography variant="h6">{loginUser?.username}</Typography>
        <Typography variant="body1" sx={{ mt: 1, fontWeight: "bold" }}>
          Total Amount: ₹{totalAmount}
        </Typography>
      </Box>

      {/* Scrollable List */}
      <Box sx={{ maxHeight: 300, overflowY: "auto", bgcolor: "white", borderRadius: 2, boxShadow: 2 }}>
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
    </Container>
  );
}

export default ProfilePage;