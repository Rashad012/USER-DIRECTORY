import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, Avatar } from "@mui/material";

export default function AddUserDialog({ open, onClose = () => {}, onAdd = () => {} }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    city: "",
    company: "",
    picture: "",
  });

  // convert file to storage
  const fileToDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });

  const handleFile = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const data = await fileToDataUrl(f);
    setForm((p) => ({ ...p, picture: data }));
  };

  const submit = () => {
    if (!form.name || !form.email) return;
    onAdd(form);
    setForm({ name: "", email: "", phone: "", website: "", city: "", company: "", picture: "" });
  };

  return (
    <Dialog open={!!open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New User</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" gap={2} flexDirection="column" mt={1}>
          <Box display="flex" gap={2} alignItems="center">
            <label>
              <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
              <Button variant="outlined" component="span">
                Upload Photo
              </Button>
            </label>
            <Avatar src={form.picture} sx={{ width: 64, height: 64 }}>{!form.picture && form.name?.[0]}</Avatar>
          </Box>

          <TextField value={form.name} label="Name" onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} fullWidth />
          <TextField value={form.email} label="Email" onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} fullWidth />
          <TextField value={form.phone} label="Phone" onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} fullWidth />
          <TextField value={form.website} label="Website" onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))} fullWidth />
          <TextField value={form.city} label="City" onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))} fullWidth />
          <TextField value={form.company} label="Company" onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))} fullWidth />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={submit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}
