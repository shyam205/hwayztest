import images from "@/utilities/images";
import { Box, Typography, styled, Card } from "@mui/material";

const RootCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(9),
    columnGap: theme.spacing(7.5),
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(6)
}))

export default function PeriodicStatus({ image, title, info }) {
    return (
        <RootCard>
            <img src={images.STATUS_ICON} alt="Status icon" />
            <Box>
                <Typography variant="paragraphMedium" mb={2}>Order Confirmed By Restaurant!</Typography>
                <Typography color="mainGray.main" variant="smallRegular">Save another Rs. 70 on this order</Typography>
            </Box>
        </RootCard>
    )
}