import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AuthenticationPage from "../pages/AuthenticationPage";
import HomePage from "../pages/HomePage";
import EventDetailsPage from "../pages/EventDetailsPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthenticationPage />} />  
        <Route path="/home" element={<HomePage />} /> 
        <Route path="/event/:id" element={<EventDetailsPage />} />

 
        {/* <Route path="/signup" element={} />
        <Route path="/home" element={} />  */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
