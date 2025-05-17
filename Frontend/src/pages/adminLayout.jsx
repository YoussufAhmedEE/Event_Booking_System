import { Box } from "@mui/material";
import Sidebar from "../components/SideBar";
import { useState } from "react";
import { Typography } from "@mui/material";

import styles from "../styles/AdminLayoutStyles";
import EventAdminContainer from "../containers/EventsAdminContainer"
import UserContainer from "../containers/UserContainer"
const renderMainContent = (activeItem) => {
    
    if(activeItem === "Events"){
        return <EventAdminContainer/>
    }
    else if(activeItem==="Analytics"){
       return( <Typography variant="body1" color="text.secondary">
            <strong>To be added Inshaa Allah</strong> 
          </Typography>);
    }
    else if(activeItem==="Customers"){
        return <UserContainer/>
}
    return null;
};
const AdminLayoutPage= ()=>{
  const [activeItem, SetActiveItem] =useState("");

  return (
    <Box sx={styles.container}>
        <Sidebar activeItem={activeItem} setActiveItem={SetActiveItem} />  
        <Box sx={styles.mainWrapper}>
            <Box component="main" sx={styles.mainContent}>
                {renderMainContent(activeItem)}
            </Box>
        </Box>
    </Box>    
);
}



export default AdminLayoutPage;
