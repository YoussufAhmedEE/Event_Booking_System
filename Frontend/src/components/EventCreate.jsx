import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { getCategories } from "../services/CategoryServices";
import { getVenues } from "../services/VenuesServices";
import { useForm } from "react-hook-form";


const EventCreateDialog = ({ open, handleClose, onCreate }) => {
  const { register, handleSubmit, reset } = useForm();
  const [categories, setCategories] = useState([]);
  const [venues, setVenues] = useState([]);
  const [images, setImages] = useState([]);


  const fetchCategories = async () => {
    const res = await getCategories();
    if (res.success) setCategories(res.categoirs);
  };

  const fetchVenues = async () => {
    const res = await getVenues();
    if (res.success) setVenues(res.venues);
  };

  useEffect(() => {
    if (open) {
      fetchCategories();
      fetchVenues();
      // reset();
    }
  }, [open]);

  const onSubmit = async (data) => {
  const formData = new FormData();

  // add text data
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });

  // add images
  images.forEach((file) => {
    formData.append("images", file);
  });

  onCreate(formData);
  handleClose();
  setImages([]); // reset images
};


  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Create New Event</DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="Event Name" fullWidth {...register("name")} />
            <TextField label="Description" fullWidth {...register("description")} />
            <TextField select label="Category" fullWidth {...register("categoryId")} defaultValue="">
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
              defaultValue="10:00:00"
              {...register("startTime")}
            />
            <TextField
              label="End Time"
              type="time"
              fullWidth
              defaultValue="18:00:00"
              {...register("endTime")}
            />
            <TextField select label="Venue" fullWidth {...register("venueId")} defaultValue="">
              {venues.map((venue) => (
                <MenuItem key={venue.id} value={venue.id}>
                  {venue.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField label="Price" type="number" fullWidth {...register("price")} />
            <Button
                variant="contained"
                component="label"
                sx={{ width: 'fit-content' }}
                >
                Upload Images
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={(e) => setImages(Array.from(e.target.files))}
                />
                </Button>

            <Typography variant="body2" color="text.secondary">
            {images.length > 0 ? `${images.length} image(s) selected` : 'No images selected'}
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Create Event
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );

};

export default EventCreateDialog;
