import { Box, Typography, Pagination, Grid, Button } from "@mui/material";
import EventCard from "../components/EventCard";
import { useEffect, useState } from "react";
import { getEvents,createEvent,deleteEvent ,updateEvent} from "../services/EventServices";
import { Book } from "../services/BookServices";
import { motion } from "framer-motion";
import EventDetailsModal from "../components/EventDetailsModel";
import EventCreateDialog from "../components/EventCreate";
import EventUpdateDialog from "../components/EventUpdate";

import ConfirmDialog from "../components/Confirmation"
import { uploadImage } from "../services/ImageServices"; 

const EventAdminContainer = () => { 
    
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [openCreation, setopenCreation] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openConfirmation, setOpenConfirmation] = useState(false);

    const [user, setUser] = useState({ id: 1 }); // for testing userId

    const fetchEvents = async () => {
        try {
        const res = await getEvents();
        if (res.success) setEvents(res.events);
        } catch (error) {
        console.error("Error fetching events:", error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleCardClick = (event) => {
        setSelectedEvent(event);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setopenCreation(false);
    };

     const handleUpdate = async (data) => {
        const res= await updateEvent(data);
        if(res.success) {
            alert("Updates done!");
            setOpenUpdate(false);
            setOpenModal(false);
            fetchEvents();
        }
        else {
            alert("some thing went wrong");
        } 
    };

     const handleDelete = async (event) => {

        const res=await deleteEvent(event.id);
        if(res.success){
            alert("event deleted !");
            setOpenConfirmation(false);
            setOpenModal(false);
            fetchEvents();
        }
        else 
            alert("some thing went wrong");
    };

const handleCreateEvent = async (formDataWithTextAndImages) => {
  // Extract images from FormData
  const images = formDataWithTextAndImages.getAll("images");

  // Create a new FormData for only non-image fields
  const formData = new FormData();
  for (let [key, value] of formDataWithTextAndImages.entries()) {
    if (key !== "images") {
      formData.append(key, value);
    }
  }

  // Create event without images
  const res = await createEvent(formData);

  if (res.success && res.event) {
    const eventId = res.event.id;

    // Upload images separately
    for (let img of images) {
      await uploadImage(eventId, img);
    }

    alert("Creation done!");
    setopenCreation(false);
    fetchEvents();
  } else {
    alert("Something went wrong");
  }
};



  return (
    <Box sx={{ p: 5 }}>

      <Typography variant="h4" gutterBottom>
        All Events
      </Typography>

        <Box sx={{ mb: 4, display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" color="primary" size="large" onClick={() => setopenCreation(true)}>Create Event</Button>
        </Box>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Grid container spacing={12}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={3} key={event.id}>
              <EventCard event={event} onClick={handleCardClick} />
            </Grid>
          ))}
        </Grid>
      </motion.div>

      <EventDetailsModal
        open={openModal}
        handleClose={handleCloseModal}
        event={selectedEvent}
        mode="admin"
        onUpdate={()=>setOpenUpdate(true)}
        onDelete={()=>setOpenConfirmation(true)}
    />

        <EventCreateDialog
        open={openCreation}
        handleClose={handleCloseModal}
        onCreate={handleCreateEvent}
    />

    <EventUpdateDialog
    open={openUpdate}
    event={selectedEvent}
    handleClose={()=>setOpenUpdate(false)}
    onUpdate={handleUpdate}
    />

    <ConfirmDialog
        open={openConfirmation}
        handleClose={() => setOpenConfirmation(false)}
        event={selectedEvent}
        handleConfirm={handleDelete}
        message="Are you sure you want to delete this event?"
    />


    </Box>
  );};

export default EventAdminContainer;
