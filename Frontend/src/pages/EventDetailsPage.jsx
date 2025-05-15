import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from "swiper/modules";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const EventDetailsPage = () => {
  const location = useLocation();
  const event=location.state?.event || null;


  if (!event) return <div>No event...</div>;

 const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
   <Box sx={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#32596a",
       
      }} >
     <Container sx={{ mt: 4 }}>

      {/* Slider Section */}
      <Slider {...settings}>
        {event.EventImages?.map((img, index) => (
          <Box
            key={index}
            component="img"
            src={img.imageUrl}
            alt={`event-img-${index}`}
            sx={{
              width: "100%",
              height: { xs: 200, md: 400 },
              objectFit: "cover",
              borderRadius: 2,
            }}
          />
        ))}
      </Slider>

      {/* Event Details */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          {event.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {event.Category?.name} | {event.Venue?.name}
        </Typography>
        <Typography variant="body1" paragraph>
          {event.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          From: {new Date(event.startDate).toLocaleDateString()} at {event.startTime}
          <br />
          To: {new Date(event.endDate).toLocaleDateString()} at {event.endTime}
        </Typography>

        <Typography variant="h6" sx={{ mt: 2 }}>
          Price: ${event.price}
        </Typography>

        <Button variant="contained" color="primary" sx={{ mt: 3 }}>
          Book Now
        </Button>
      </Box>
    </Container>
   </Box>
  );
};


export default EventDetailsPage;
