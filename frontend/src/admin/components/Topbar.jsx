// src/admin/components/Topbar.jsx
import React, { useState, useEffect, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import { alpha, styled } from "@mui/material/styles";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.08),
  "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.12) },
  marginLeft: 0,
  width: "100%",
  maxWidth: 420,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
  },
}));

export default function Topbar({ onMenuClick, onSearch, title = "Admin Dashboard" }) {
  const [q, setQ] = useState("");
  const timer = useRef(null);

  useEffect(() => {
    // debounce
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      onSearch?.(q.trim());
    }, 300);
    return () => clearTimeout(timer.current);
  }, [q, onSearch]);

  return (
    <AppBar position="fixed" color="primary" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={onMenuClick} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ mr: 3 }}>
          {title}
        </Typography>

        <Box sx={{ flex: 1 }}>
          <Search>
            <SearchIconWrapper><SearchIcon /></SearchIconWrapper>
            <StyledInputBase
              placeholder="Search artifacts..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Box>

        <IconButton color="inherit" aria-label="account">
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
