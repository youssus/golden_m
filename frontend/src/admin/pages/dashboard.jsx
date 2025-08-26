// src/admin/pages/dashboard.jsx
import React from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import ArtifactFormDrawer from "../components/ArtifactFormDrawer";

const API_BASE = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace(/\/$/, "") + "/"
  : "http://localhost:3000/";

export default function Dashboard() {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [editing, setEditing] = React.useState(null);
  const [confirmDelete, setConfirmDelete] = React.useState({
    open: false,
    id: null,
  });
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchData = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}api/artifacts/getall`);
      const mapped = res.data.map((a) => ({ ...a, id: a._id || a.id }));
      setRows(mapped);
    } catch (err) {
      console.error("Failed fetching artifacts", err);
      setSnackbar({
        open: true,
        message: "Failed fetching artifacts",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Force DataGrid to recompute layout after sidebar/drawer transitions
  React.useEffect(() => {
    const triggerResize = (delay = 200) => {
      setTimeout(() => window.dispatchEvent(new Event("resize")), delay);
    };
    triggerResize(220);
  }, [sidebarOpen]);

  React.useEffect(() => {
    const t = setTimeout(() => window.dispatchEvent(new Event("resize")), 220);
    return () => clearTimeout(t);
  }, [drawerOpen]);

  React.useEffect(() => {
    let timer = null;
    const onResize = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (timer) clearTimeout(timer);
    };
  }, []);

  const filteredRows = React.useMemo(() => {
    if (!search) return rows;
    const q = search.toLowerCase();
    return rows.filter(
      (r) =>
        (r.title || "").toLowerCase().includes(q) ||
        (r.subDescription || "").toLowerCase().includes(q)
    );
  }, [rows, search]);

  const handleCreateClick = () => {
    setEditing(null);
    setDrawerOpen(true);
  };
  const handleEdit = (row) => {
    setEditing(row);
    setDrawerOpen(true);
  };

  const handleSaved = (saved) => {
    if (!saved) {
      fetchData();
      setSnackbar({ open: true, message: "Saved", severity: "success" });
      return;
    }

    const id = saved._id || saved.id;
    const exists = rows.some((r) => r._id === id || r.id === id);
    if (exists) {
      setRows((prev) =>
        prev.map((r) =>
          r._id === id || r.id === id ? { ...r, ...saved, id } : r
        )
      );
      setSnackbar({
        open: true,
        message: "Artifact updated",
        severity: "success",
      });
    } else {
      setRows((prev) => [{ ...saved, id }, ...prev]);
      setSnackbar({
        open: true,
        message: "Artifact created",
        severity: "success",
      });
    }
  };

  const handleDelete = async (id) => {
    const prev = rows;
    setRows((r) => r.filter((x) => (x._id || x.id) !== id));
    setConfirmDelete({ open: false, id: null });
    try {
      await axios.delete(`${API_BASE}api/artifacts/delete/${id}`);
      setSnackbar({ open: true, message: "Deleted", severity: "success" });
    } catch (err) {
      console.error("Delete failed", err);
      setRows(prev);
      setSnackbar({ open: true, message: "Delete failed", severity: "error" });
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 120 },
    { field: "title", headerName: "Title", flex: 1, minWidth: 180 },
    {
      field: "subDescription",
      headerName: "Sub Description",
      flex: 1,
      minWidth: 160,
    },
    {
      field: "banner",
      headerName: "Banner",
      width: 120,
      sortable: false,
      renderCell: () => {
        // Ne jamais afficher le banner dans la carte
        return "—";
      },
    },

    {
      field: "pictures",
      headerName: "Pictures",
      width: 200,
      sortable: false,
      renderCell: (params) => {
        const pics = Array.isArray(params.value) ? params.value : [];
        return (
          <div style={{ display: "flex", gap: 8 }}>
            {pics.length > 0 && (
              <img
                src={
                  String(pics[0]).startsWith("http")
                    ? pics[0]
                    : `${API_BASE}${String(pics[0]).replace(/^\/+/, "")}`
                }
                alt="first-pic"
                style={{
                  width: 56,
                  height: 56,
                  objectFit: "cover",
                  borderRadius: 6,
                }}
              />
            )}
            {pics.slice(1, 4).map((p, i) => {
              const url = String(p).startsWith("http")
                ? p
                : `${API_BASE}${String(p).replace(/^\/+/, "")}`;
              return (
                <img
                  key={i}
                  src={url}
                  alt={`pic-${i + 1}`}
                  style={{
                    width: 56,
                    height: 56,
                    objectFit: "cover",
                    borderRadius: 6,
                  }}
                />
              );
            })}
            {pics.length > 4 && (
              <div style={{ alignSelf: "center", fontSize: 12 }}>
                +{pics.length - 4}
              </div>
            )}
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 190,
      sortable: false,
      renderCell: (params) => {
        const row = params.row;
        return (
          <div style={{ display: "flex", gap: 8 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleEdit(row)}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() =>
                setConfirmDelete({ open: true, id: row._id || row.id })
              }
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", overflow: "hidden" }}>
      <Topbar
        onMenuClick={() => setSidebarOpen((s) => !s)}
        onSearch={setSearch}
      />

      {/* Sidebar controls its own width */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content flex-grow, no overflow */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          bgcolor: "#f5f7fb",
          minWidth: 0, // 👈 prevents overflow when sidebar collapses
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h5">Artifacts</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateClick}
          >
            New Artifact
          </Button>
        </Box>

        <Paper
          sx={{
            height: "calc(100vh - 240px)",
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {loading ? (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <DataGrid
              rows={filteredRows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              disableSelectionOnClick
              sx={{ flex: 1, minWidth: 0 }} // 👈 important
              autoHeight={false}
              onRowDoubleClick={(params) => handleEdit(params.row)}
            />
          )}
        </Paper>

        <ArtifactFormDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          onSaved={handleSaved}
          initialValues={editing}
        />

        <Dialog
          open={confirmDelete.open}
          onClose={() => setConfirmDelete({ open: false, id: null })}
        >
          <DialogTitle>Delete artifact?</DialogTitle>
          <DialogActions>
            <Button onClick={() => setConfirmDelete({ open: false, id: null })}>
              Cancel
            </Button>
            <Button
              color="error"
              onClick={() => handleDelete(confirmDelete.id)}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        >
          <Alert
            severity={snackbar.severity}
            onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
