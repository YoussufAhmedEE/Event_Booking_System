import Hero from "../components/Hero";
import { useNavigate } from "react-router-dom";

const HeroContainer = () => {
  const navigate = useNavigate();

  const handleBrowseEvents = () => {
    navigate("/events"); // or your events listing route
  };

  return <Hero onBrowseEventsClick={handleBrowseEvents} />;
};

export default HeroContainer;
