import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { getCategories } from "../services/CategoryServices";
import { getVenues } from "../services/VenuesServices";
import { useForm } from "react-hook-form";

const EventUpdateDialog = ({ open, event, handleClose, onUpdate }) => {
  const { register, handleSubmit, reset } = useForm();
  const [categories, setCategories] = useState([]);
  const [venues, setVenues] = useState([]);

  const status=['Available', 'Finished', 'Cancelled'];
  // Fetch categories from service
  const fetchCategories = async () => {
    const res = await getCategories();
    if (res.success) setCategories(res.categoirs);
  };

  // Fetch venues from service
  const fetchVenues = async () => {
    const res = await getVenues();
    if (res.success) setVenues(res.venues);
  };

  // Load form data & resources when dialog opens
  useEffect(() => {
    if (open) {
      fetchCategories();
      fetchVenues();
      reset(event); // Prefill form with selected event data
    }
  }, [open, event, reset]);

  // Handle form submission
  const onSubmit = (data) => {

    onUpdate(data);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Update Event</DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="Event Name" fullWidth {...register("name")} />

            <TextField label="Description" fullWidth {...register("description")} />

            <TextField select label="Category" fullWidth {...register("categoryId")}>
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Start Date"
              type="date"
            InputLabelProps={{ shrink: true }}
              fullWidth
              {...register("startDate")}
            />

            <TextField
              label="End Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              {...register("endDate")}
            />

            <TextField
              label="Start Time"
              type="time"
              fullWidth
              {...register("startTime")}
            />

            <TextField
              label="End Time"
              type="time"
              fullWidth
              {...register("endTime")}
            />

            <TextField select label="Venue" fullWidth {...register("venueId")}>
              {venues.map((venue) => (
                <MenuItem key={venue.id} value={venue.id}>
                  {venue.name}
                </MenuItem>
              ))}
            </TextField>
            
            <TextField select label="status" fullWidth {...register("status")}>
                 {status.map((st) => (
                <MenuItem key={st} value={st}>
                  {st}
                </MenuItem>
              ))}
            </TextField>


            <TextField label="Price" type="number" fullWidth {...register("price")} />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Update Event
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EventUpdateDialog;
