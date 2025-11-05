import React, { useEffect, useState } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  TextField,
  Button,
  IconButton,
  Grid,
} from "@mui/material";
import { Add as AddIcon, Brightness4 as DarkIcon, Brightness7 as LightIcon } from "@mui/icons-material";

import UserCard from "./components/UserCard";
import UserDialog from "./components/UserDialog";
import AddUserDialog from "./components/AddUserDialog";
import EditUserDialog from "./components/EditUserDialog";

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

 
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: darkMode ? "#90caf9" : "#1976d2" },
      secondary: { main: "#ff8a65" },
      background: {
        default: darkMode ? "#0f1720" : "#f4f6fb",
        paper: darkMode ? "#0b1220" : "#ffffff",
      },
    },
    typography: { fontFamily: "Inter, Roboto, sans-serif" },
  });

 
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((r) => r.json())
      .then((data) => {
        const mapped = data.map((u) => ({
          ...u,
          picture: `https://i.pravatar.cc/150?img=${(u.id % 70) + 1}`,
        }));
        setUsers(mapped);
      })
      .catch((e) => console.error(e));
  }, []);


  const filtered = users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()));


  const addUser = (user) => {
    const id = users.length ? users[users.length - 1].id + 1 : Date.now();
    const toAdd = {
      id,
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      website: user.website || "",
      address: { city: user.city || "" },
      company: { name: user.company || "" },
      picture: user.picture || `https://i.pravatar.cc/150?img=${(id % 70) + 1}`,
    };
    setUsers((prev) => [...prev, toAdd]);
  };

  
  const updateUser = (updated) => {
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? { ...u, ...updated } : u)));
  };

  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setSelectedUser(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppBar
        position="static"
        sx={{
          background: darkMode ? "linear-gradient(90deg,#0f1720,#04203a)" : "linear-gradient(90deg,#36d1dc,#5b86e5)",
          boxShadow: 4,
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            REMITBEE — User Directory
          </Typography>

          <IconButton onClick={() => setDarkMode((d) => !d)} color="inherit" aria-label="toggle theme">
            {darkMode ? <LightIcon /> : <DarkIcon />}
          </IconButton>

          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            sx={{ ml: 2, textTransform: "none", fontWeight: 700 }}
            onClick={() => setOpenAdd(true)}
          >
            Add User
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 6, pb: 6 }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 4, justifyContent: "center" }}>
          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users by name..."
            sx={{
              width: { xs: "100%", sm: 420 },
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 1,
            }}
            size="small"
          />
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {filtered.map((u) => (
            <Grid item key={u.id} xs={12} sm={6} md={4} lg={3}>
              <UserCard
                user={u}
                onOpen={() => setSelectedUser(u)}
                onEdit={() => {
                  setEditingUser(u);
                  setOpenEdit(true);
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Details dialog */}
      <UserDialog user={selectedUser} onClose={() => setSelectedUser(null)} onDelete={deleteUser} onEdit={(u) => { setEditingUser(u); setOpenEdit(true); setSelectedUser(null); }} />

      {/* Add dialog */}
      <AddUserDialog open={openAdd} onClose={() => setOpenAdd(false)} onAdd={(u) => { addUser(u); setOpenAdd(false); }} />

      {/* Edit dialog */}
      <EditUserDialog
        open={openEdit}
        onClose={() => {
          setOpenEdit(false);
          setEditingUser(null);
        }}
        user={editingUser}
        onSave={(updated) => {
          updateUser(updated);
          setOpenEdit(false);
          setEditingUser(null);
        }}
      />
    </ThemeProvider>
  );
}

export default App;
