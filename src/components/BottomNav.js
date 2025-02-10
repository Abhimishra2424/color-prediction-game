import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Home, EmojiEvents, AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const BottomNav = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  return (
    <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          if (newValue === 0) navigate("/");
          if (newValue === 1) navigate("/win");
          if (newValue === 2) navigate("/profile");
        }}
      >
        <BottomNavigationAction label="Home" icon={<Home />} />
        <BottomNavigationAction label="Win" icon={<EmojiEvents />} />
        <BottomNavigationAction label="Profile" icon={<AccountCircle />} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
