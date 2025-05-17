import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import CustomerCard from "../components/CustomerCard"; // Adjust path as needed
import { getUsers } from "../services/UserServices";  // You should implement this service

const UserContainer = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getUsers(); // Should return an array of user objects
      if (res.success && res.data) {
        setUsers(res.data);
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" mb={4}>
        All Customers
      </Typography>
      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <CustomerCard user={user} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserContainer;
