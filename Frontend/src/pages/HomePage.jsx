import { useRef } from "react";

import HeroContainer from "../containers/HeroContainer";
import EventsSection from "../containers/EventCardContainer";
import { getEvents ,BookedEvents} from "../services/EventServices";
const HomePage = () => {
  
  return (
      <>
      <HeroContainer/>
      <EventsSection fetchFunction={getEvents} title="Upcoming Events" bgColor="#7cb3dc" />
      <EventsSection fetchFunction={BookedEvents} title="Booked Events" bgColor="#82e0aa"/>
      </>
  );
};

export default HomePage;
