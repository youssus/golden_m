// src/admin/components/Sidebar.jsx
import React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const drawerWidth = 240;

export default function Sidebar({ open = true, onClose, onSelect, selected = "artifacts" }) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  // On small screens use temporary drawer
  const variant = isSm ? "temporary" : "persistent";
  const effectiveOpen = isSm ? open : open;

  return (
    <Drawer
      variant={variant}
      open={effectiveOpen}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        width: open ? drawerWidth : 64,
        flexShrink: 0,
        "& .MuiDrawer-paper": { width: open ? drawerWidth : 64, boxSizing: "border-box", top: 64 },
      }}
    >
      <Toolbar sx={{ minHeight: 64 }} />
      <Box sx={{ overflow: "auto", mt: 2 }}>
        <List>
          <ListItem button selected={selected === "artifacts"} onClick={() => onSelect?.("artifacts")}>
            <ListItemIcon><Inventory2Icon /></ListItemIcon>
            <ListItemText primary="Artifacts" />
          </ListItem>
          {/* Add more items and call onSelect for navigation */}
        </List>
      </Box>
    </Drawer>
  );
}
