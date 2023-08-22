import { Box, Typography } from "@mui/material";
import CreateEventForm from "./form";

export default function CreateEventPage() {
    return (
        <Box className="p-16">
            <Typography>
                Create Event Page
            </Typography>
            <Box>
                <CreateEventForm/>
            </Box>
        </Box>
    )
}