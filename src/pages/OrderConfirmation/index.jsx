import Header from "@/components/Header";
import { RootContainer } from "@/pages/pages.styles";
import { Box, Typography, styled } from "@mui/material";
import PeriodicStatus from "./components/PeriodicStatus";
import MapSection from "./components/MapSection";
import OrderItems from "./components/OrderItems";
import BillDetails from "./components/BillDetails";
import images from "@/utilities/images";

const Background = styled(Box)(() => ({
    background: `url(${images.PINK_BACKGROUND})`,
    backgroundPosition: "top center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
}))

export default function OrderConfirmation() {
    return (
        <RootContainer>
            <Background px={10}>
                <Header renderMain={<Typography variant="heading6Medium">Order 02356001</Typography>} />
                <PeriodicStatus />
                <MapSection />
            </Background>
            <Box px={10}>
                <OrderItems />
                <BillDetails />
            </Box>
        </RootContainer>
    )
}