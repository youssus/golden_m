// src/admin/components/CustomArtifactForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box, Grid, TextField, Button, Typography, IconButton, LinearProgress
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const API_BASE = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/$/, "") + "/" : "http://localhost:3000/";

export default function CustomArtifactForm({ initialValues = {}, onSaved, onClose }) {
  const [form, setForm] = useState({ title: "", subDescription: "", description: "", information: "", avis: "", design: "" });
  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [picturesFiles, setPicturesFiles] = useState([]);
  const [picturesPreviews, setPicturesPreviews] = useState([]);
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (initialValues && Object.keys(initialValues).length) {
      setForm({
        title: initialValues.title || "",
        subDescription: initialValues.subDescription || "",
        description: initialValues.description || "",
        information: initialValues.information || "",
        avis: initialValues.avis || "",
        design: initialValues.design || "",
      });

      if (initialValues.banner) {
        const url = String(initialValues.banner).startsWith("http") ? initialValues.banner : `${API_BASE}${String(initialValues.banner).replace(/^\/+/, "")}`;
        setBannerPreview(url);
      } else setBannerPreview(null);

      if (Array.isArray(initialValues.pictures) && initialValues.pictures.length) {
        setPicturesPreviews(initialValues.pictures.map(p => (String(p).startsWith("http") ? p : `${API_BASE}${String(p).replace(/^\/+/, "")}`)));
        setPicturesFiles([]);
      } else {
        setPicturesPreviews([]);
        setPicturesFiles([]);
      }
    } else {
      setForm({ title: "", subDescription: "", description: "", information: "", avis: "", design: "" });
      setBannerFile(null); setBannerPreview(null); setPicturesFiles([]); setPicturesPreviews([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  const handleChange = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  const handleBanner = (e) => {
    const file = e.target.files?.[0] ?? null;
    setBannerFile(file);
    setBannerPreview(file ? URL.createObjectURL(file) : null);
  };

  const handlePictures = (e) => {
    const files = Array.from(e.target.files || []);
    const newFiles = [...picturesFiles, ...files].slice(0, 4);
    setPicturesFiles(newFiles);
    setPicturesPreviews(newFiles.map((f) => URL.createObjectURL(f)));
  };

  const removePicture = (index) => {
    const newFiles = picturesFiles.filter((_, i) => i !== index);
    setPicturesFiles(newFiles);
    setPicturesPreviews(newFiles.map((f) => URL.createObjectURL(f)));
  };

  const submitCreate = async (fd) => {
    const res = await axios.post(`${API_BASE}api/artifacts/create`, fd, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (e) => setProgress(Math.round((e.loaded * 100) / e.total || 0))
    });
    return res.data;
  };

  const submitUpdate = async (id, fd) => {
    const res = await axios.put(`${API_BASE}api/artifacts/update/${id}`, fd, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (e) => setProgress(Math.round((e.loaded * 100) / e.total || 0))
    });
    return res.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) return alert("Title required");

    setSaving(true);
    setProgress(0);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v ?? ""));
      if (bannerFile) fd.append("banner", bannerFile);
      picturesFiles.forEach((f) => fd.append("pictures", f));

      let saved;
      if (initialValues && (initialValues._id || initialValues.id)) {
        const id = initialValues._id || initialValues.id;
        saved = await submitUpdate(id, fd);
      } else {
        saved = await submitCreate(fd);
      }

      // return the saved artifact (backend should return it)
      onSaved?.(saved);
      onClose?.();
    } catch (err) {
      console.error("Save failed", err);
      alert("Save failed");
    } finally {
      setSaving(false);
      setProgress(0);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 1, width: "100%" }}>
      <Typography variant="h6" gutterBottom>
        {initialValues && (initialValues._id || initialValues.id) ? "Edit Artifact" : "New Artifact"}
      </Typography>

      {saving && <LinearProgress variant="determinate" value={progress} sx={{ mb: 1 }} />}

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}><TextField label="Title" value={form.title} onChange={handleChange("title")} fullWidth required /></Grid>
        <Grid item xs={12} sm={6}><TextField label="Sub Description" value={form.subDescription} onChange={handleChange("subDescription")} fullWidth /></Grid>
        <Grid item xs={12} sm={6}><TextField label="Description" value={form.description} onChange={handleChange("description")} fullWidth /></Grid>
        <Grid item xs={12} sm={6}><TextField label="Information" value={form.information} onChange={handleChange("information")} fullWidth /></Grid>
        <Grid item xs={12} sm={6}><TextField label="Avis" value={form.avis} onChange={handleChange("avis")} fullWidth /></Grid>
        <Grid item xs={12} sm={6}><TextField label="Design" value={form.design} onChange={handleChange("design")} fullWidth /></Grid>

        <Grid item xs={12} sm={6}>
          <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} disabled={saving}>
            {bannerFile || bannerPreview ? "Change Banner" : "Upload Banner"}
            <VisuallyHiddenInput name="banner" type="file" accept="image/*" onChange={handleBanner} />
          </Button>
          {bannerPreview && <Box mt={1}><img src={bannerPreview} alt="banner-preview" style={{ width: 160, height: 90, objectFit: "cover", borderRadius: 6 }} /></Box>}
        </Grid>

        <Grid item xs={12} sm={6}>
          <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} disabled={saving}>
            {picturesFiles.length > 0 || picturesPreviews.length > 0 ? "Change Pictures" : "Upload Pictures"}
            <VisuallyHiddenInput name="pictures" type="file" accept="image/*" multiple onChange={handlePictures} />
          </Button>

          {picturesPreviews.length > 0 && (
            <Box mt={1} sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {picturesPreviews.map((p, i) => (
                <Box key={i} sx={{ position: "relative" }}>
                  <img src={p} alt={`pic-${i}`} style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 6 }} />
                  {!saving && (
                    <IconButton size="small" onClick={() => removePicture(i)} sx={{ position: "absolute", top: -6, right: -6, bgcolor: "white" }}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              ))}
            </Box>
          )}
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button type="submit" variant="contained" disabled={saving}>{initialValues && (initialValues._id || initialValues.id) ? "Update" : "Create"}</Button>
            {onClose && <Button variant="outlined" onClick={onClose} disabled={saving}>Cancel</Button>}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
