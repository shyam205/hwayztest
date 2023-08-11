import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

export default function NearestStore() {
    return (
        <Box mt={12} mb={10} borderRadius="8px" p={6} bgcolor="#E7E7E7">
            <Typography>Upcoming stops: <Typography variant="bold" as="span">Hosakote, 60.0 km</Typography></Typography>
            <Typography>Arrival time: <Typography variant="bold" as="span">09:30 PM</Typography></Typography>
            <Typography>Halt duration: <Typography variant="bold" as="span">25 min</Typography></Typography>
        </Box>
    )
}