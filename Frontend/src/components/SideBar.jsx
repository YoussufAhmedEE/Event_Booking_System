import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

import EventIcon from '@mui/icons-material/Event';
import AnalyticsIcon from '@mui/icons-material/Analytics';


import {
  People
} from "@mui/icons-material";
import styles from "../styles/SideBarStyles";

const sidebarItems = [
  { text: "Events", icon: <EventIcon sx={{ fontSize: 22 }} /> },
  { text: "Analytics", icon: <AnalyticsIcon sx={{ fontSize: 22 }} /> },
  { text: "Customers", icon: <People sx={{ fontSize: 22 }} /> },
];

const Sidebar = ({ activeItem, setActiveItem }) => {

  const handleItemClick = (text) => {
    console.log(text)
      setActiveItem(text);
  };

  return (
    <Box sx={styles.sidebar}>
      <List sx={styles.sidebarList}>
        {sidebarItems.map(({ text, icon }) => (
          <ListItem
            button
            key={text}
            onClick={() => handleItemClick(text)}
            sx={styles.sidebarItem(activeItem === text)}>
            <ListItemIcon sx={{ minWidth: "unset", color: "inherit" }}>
              {icon}
            </ListItemIcon>
            <ListItemText primary={text} sx={styles.listItemText} />
          </ListItem>
        ))}
      </List>
      <Divider sx={styles.divider} />
      
    </Box>
  );
};

export default Sidebar;
