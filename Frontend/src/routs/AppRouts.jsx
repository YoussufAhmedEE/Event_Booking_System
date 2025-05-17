import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AuthenticationPage from "../pages/AuthenticationPage";
import HomePage from "../pages/HomePage";
import EventDetailsPage from "../pages/EventDetailsPage";
import AdminLayoutPage from "../pages/adminLayout"
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthenticationPage />} />  
        <Route path="/home" element={<HomePage />} /> 
        <Route path="/event/:id" element={<EventDetailsPage />} />
        <Route path="/admin" element={<AdminLayoutPage />} />

      </Routes>
    </Router>
  );
};

export default AppRoutes;
