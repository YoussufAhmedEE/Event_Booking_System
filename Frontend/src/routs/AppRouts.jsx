import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AuthenticationPage from "../pages/AuthenticationPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthenticationPage />} />  
 
        {/* <Route path="/signup" element={} />
        <Route path="/home" element={} />  */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
