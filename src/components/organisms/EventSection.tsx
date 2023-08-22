import { Box } from "@mui/material";
import EventCard from "../molecules/cards/eventCard";

export default function EventSection({ events }: { events: any }) {
  return (
    <Box className="grid grid-cols-2 gap-x-5 gap-y-5">
      {events && events.map((event: any) => <EventCard event={event} />)}
    </Box>
  );
}
