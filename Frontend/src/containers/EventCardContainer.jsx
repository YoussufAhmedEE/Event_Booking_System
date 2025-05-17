import { Box, Typography, Pagination } from "@mui/material";
import EventCard from "../components/EventCard";
import { useEffect, useState } from "react";
import {book,myBookings, isEventBooked,cancel} from "../services/BookServices"
import { motion } from "framer-motion";


import EventDetailsModal from "../components/EventDetailsModel";
import CongratsDialog from "../components/Congratulation"
const EventsSection = ({fetchFunction, title, bgColor}) => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [isBooked,setIsBooked]=useState(false);

  const [openCongrats, setOpenCongrats] = useState(false);

  
  const eventsPerPage = 8;

  const fetchEvents = async () => {
    try {
      const res = await fetchFunction();
      if (res.success) setEvents(res.events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCardClick = async (event) => {
    setSelectedEvent(event);

    if(title!="Booked Events"){
      const response=await isEventBooked({eventId:event.id})
      setIsBooked(response);
    }
    else{
      setIsBooked(true);
    }
    
    console.log(selectedEvent)
    setOpenModal(true);
  };
  
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handlePageChange = (event, value) => {
        setPage(value);
  };

  const handleBookNow =async (event) => {
    try {
    const response = await book({ eventId: event.id });

    if (response.success) {
      setOpenCongrats(true);
      fetchEvents();

    } else {
      handleCloseModal(); 
      alert(`Something went wrong while booking. Please try again. ${response.error}`);
    }
  } catch (error) {
    handleClose();
    alert("An error occurred: " + error.message);
  }
  };
  const handleCancelBooking =async (event)=>{
    try {
    const response = await cancel( {eventId:event.id });

    if (response.success) {
      alert("Done");
      fetchEvents();

    } else {
      alert(`Something went wrong while canceling. Please try again. ${response.error}`);
    }

    handleCloseModal(); 

  } catch (error) {
    handleClose();
    alert("An error occurred: " + error.message);
  }

  }
  
const handleCloseCongrats = () => {
      setOpenCongrats(false);
      handleCloseModal();
};


  const indexOfLastEvent = page * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const totalPages = Math.ceil(events.length / eventsPerPage);

  return (
    <Box sx={{ p: 5, backgroundColor: bgColor }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
       {title}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 3,
        }}
      >
        {currentEvents.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, scale: 0.80 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
        <EventCard event={event} onClick={() => handleCardClick(event)} />
              <EventDetailsModal
                open={openModal}
                handleClose={handleCloseModal}
                event={selectedEvent}
                mode="user"
                isBooked={isBooked}
                onBookNow={handleBookNow}
                onCancelBooking={handleCancelBooking}

              />
              <CongratsDialog open={openCongrats} handleClose={handleCloseCongrats} />

     </motion.div>
        ))}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>

          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
      </Box>
    </Box>
  );
};

export default EventsSection;
