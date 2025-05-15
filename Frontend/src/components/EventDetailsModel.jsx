import { Dialog, DialogTitle, DialogContent, Typography, IconButton, Box, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const EventDetailsModal = ({ open, handleClose, event, isBooked, onBookNow }) => {
  if (!event) return null;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {event.name}
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>

        {/* Image Slider */}
        <Box sx={{ mb: 3 }}>
          <Slider {...settings}>
            {event.EventImages.map((img, idx) => (
              <Box key={idx}>
                <motion.img
                  src={img.imageUrl}
                  alt={`event-img-${idx}`}
                  style={{ width: "100%", height: "350px", objectFit: "cover", borderRadius: "12px" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </Box>
            ))}
          </Slider>
        </Box>

        {/* Details */}
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Description:</strong> {event.description}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Category:</strong> {event.Category.name}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Venue:</strong> {event.Venue.name}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Date:</strong> {event.startDate.substring(0, 10)} to {event.endDate.substring(0, 10)}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Time:</strong> {event.startTime} - {event.endTime}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Price:</strong> {event.price} AED
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          <strong>Status:</strong> {event.status}
        </Typography>

        {/* Book Now / Booked Button */}
        <Button
          variant="contained"
          color={isBooked ? "success" : "primary"}
          disabled={isBooked}
          onClick={() => onBookNow(event)}
          fullWidth
          sx={{ mt: 2 }}
        >
          {isBooked ? "Booked" : "Book Now"}
        </Button>

      </DialogContent>
    </Dialog>
  );
};

export default EventDetailsModal;
