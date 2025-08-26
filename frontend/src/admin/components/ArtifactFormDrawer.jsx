// src/admin/components/ArtifactFormDrawer.jsx
import React from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import CustomArtifactForm from "./CustomArtifactForm";

export default function ArtifactFormDrawer({ open, onClose, onSaved, initialValues }) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 680, p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </Box>
        <CustomArtifactForm initialValues={initialValues || {}} onSaved={onSaved} onClose={onClose} />
      </Box>
    </Drawer>
  );
}
