import React from "react";
import { Container, Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { MdAttachMoney, MdOutlineLock, MdMoneyOff, MdAccountCircle, MdArrowBack } from "react-icons/md"; // Icons

function ProfilePage() {
  const userName = "John Doe"; // Replace with actual user data
  const totalAmount = 5000; // Replace with actual balance from backend

  const options = [
    { name: "Add Money", icon: <MdAttachMoney size={24} />, path: "/add-money" },
    { name: "Withdraw", icon: <MdMoneyOff size={24} />, path: "/withdraw" },
    { name: "Update Password", icon: <MdOutlineLock size={24} />, path: "/update-password" },
  ];

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      {/* Back Navigation */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <MdArrowBack size={28} />
        </Link>
        <Typography variant="h6" sx={{ ml: 2 }}>Home</Typography>
      </Box>

      {/* User Info */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "#222",
          color: "white",
          borderRadius: 2,
          mb: 2,
        }}
      >
        <MdAccountCircle size={50} style={{ marginBottom: 8 }} />
        <Typography variant="h6">{userName}</Typography>
        <Typography variant="body1" sx={{ mt: 1, fontWeight: "bold" }}>
          Total Amount: ₹{totalAmount}
        </Typography>
      </Box>

      {/* Profile Options List */}
      <List sx={{ bgcolor: "white", borderRadius: 2, boxShadow: 2 }}>
        {options.map((option, index) => (
          <React.Fragment key={index}>
            <Link to={option.path} style={{ textDecoration: "none", color: "inherit" }}>
              <ListItem button sx={{ "&:hover": { bgcolor: "#f5f5f5" } }}>
                <ListItemIcon>{option.icon}</ListItemIcon>
                <ListItemText primary={option.name} />
              </ListItem>
            </Link>
            {index < options.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
}

export default ProfilePage;
