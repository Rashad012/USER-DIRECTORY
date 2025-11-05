import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Avatar, Typography, Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function UserDialog({ user, onClose = () => {}, onDelete = () => {}, onEdit = () => {} }) {
  if (!user) return <Dialog open={false} />;

  return (
    <Dialog open={!!user} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar src={user.picture} sx={{ width: 72, height: 72 }} />
          <Box>
            <Typography variant="h6">{user.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {user.company?.name}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }} />
          <IconButton
            onClick={() => {
              onEdit(user);
            }}
            color="primary"
          >
            <EditIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Email:
            </Typography>
            <Typography variant="body2">{user.email}</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Phone:
            </Typography>
            <Typography variant="body2">{user.phone}</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              City:
            </Typography>
            <Typography variant="body2">{user.address?.city}</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Website:
            </Typography>
            <Typography variant="body2">{user.website}</Typography>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button color="error" startIcon={<DeleteIcon />} onClick={() => onDelete(user.id)}>
          Delete
        </Button>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
