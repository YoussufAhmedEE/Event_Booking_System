import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Grid,
  Card,
  CardContent,
  Typography,
  DialogActions,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { getUsers } from "../services/UserServices"; 

const UserSelectDialog = ({ open, onClose, onSelect }) => {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (open) {
      fetchUsers();
      setSearch("");
    }
  }, [open]);

  const fetchUsers = async () => {
    const res = await getUsers();
    if (res.data) {
      setUsers(res.data);
      setFiltered(res.data);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    const filteredUsers = users.filter((user) =>
      user.phoneNumber?.includes(value)
    );
    setFiltered(filteredUsers);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Select a User</DialogTitle>
      <DialogContent dividers>
        <TextField
          fullWidth
          label="Search by Phone Number"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          sx={{ mb: 2 }}
        />
        <Grid container spacing={2}>
          {filtered.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Card
                sx={{
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
                onClick={() => {
                  onSelect(user);
                  onClose();
                }}
              >
                <CardContent>
                  <Typography variant="h6">
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Email: {user.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Phone: {user.phoneNumber || "N/A"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Gender: {user.gender}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserSelectDialog;
