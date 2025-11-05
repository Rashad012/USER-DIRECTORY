import React from "react";
import { Card, CardContent, Avatar, Typography, Box,  } from "@mui/material";

export default function UserCard({ user, onOpen = () => {}, onEdit = () => {} }) {
  return (
    <Card
      onClick={onOpen}
      sx={{
        cursor: "pointer",
        borderRadius: 3,
        textAlign: "center",
        py: 2,
        px: 1,
        transition: "transform 0.25s, box-shadow 0.25s",
        "&:hover": { transform: "translateY(-8px)", boxShadow: 6 },
      }}
      elevation={3}
    >
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Avatar
          src={user.picture}
          alt={user.name}
          sx={{ width: 92, height: 92, border: "3px solid rgba(144,202,249,0.6)" }}
        >
          {user.name?.[0]}
        </Avatar>
      </Box>

      <CardContent>
        <Typography variant="h6" noWrap sx={{ fontWeight: 700 }}>
          {user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {user.email}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {user.address?.city}
        </Typography>

        <Box sx={{ mt: 1 }}>
        
        </Box>
      </CardContent>
    </Card>
  );
}
