import Header from "@/components/Header";
import { RootContainer } from "@/pages/pages.styles";
import images from "@/utilities/images";
import { Box, Button, Typography, styled } from "@mui/material";
import dayjs from "dayjs";
import ProceedToPay from "./components/ProceedToPay";
import { SectionBox } from "./page.styles";
import BillDetails from "./components/BillDetails";
import SelectedProducts from "./components/SelectedProducts";
import useCustomer from "@/state/customer";

const ScreenHeader = styled(Box)(({ theme }) => ({
    boxShadow: "0px 15px 25px 0px #0000000D",
    backgroundColor: '#ffffff',
    padding: `${theme.spacing(10)} ${theme.spacing(6)}`,
    borderRadius: 12,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
}))

export default function ConfirmSelection({eta}) {
    const { restaurantdetail } = useCustomer(state => state)
    //console.log("restaurantdetail ",restaurantdetail)
    return (
        <RootContainer bgcolor="#F9F9F9">
            <Box px={10} sx={{ mb:'90px' }}>
                <Header />
                <ScreenHeader mb={10}>
                    <Box>
                        { Object.keys(restaurantdetail).length > 0 && <Typography variant="heading5Medium">{restaurantdetail?.trade_name}</Typography> }
                        <Box mt={4} display="flex" alignItems="center">
                            <img src={images.ETA_ICON} />
                            {/* <Typography ml={2} color="mainGray.main" variant="paragraphRegular">{dayjs(new Date()).fromNow()}</Typography> */}
                            <Typography ml='12px' color="#939497" variant="paragraphRegular">ETA {eta || '9:30'}</Typography>
                        </Box>
                    </Box>
                    <img src={images.RESTAURANT_CONFIRM_LOGO} alt="Confirm Restaurant order" />
                </ScreenHeader>
                <SelectedProducts />
                <Typography my={10} variant="heading5Medium">Bill Details</Typography>
                <BillDetails />
                <Typography my={10} variant="paragraphMedium" color='#0E0F13' lineHeight='140%'>Review your order and stop details to avoid cancellations</Typography>
                <SectionBox>
                    <Box>
                        <Typography color="#939497" lineHeight="16.8px" variant="smallRegular"><Typography mr={2} color="primary" variant="smallBold" as="span">Note:</Typography>if you cancel order 15 mins prior to your arrival, a 100% refund will be issued. No refund for cancellation made if ETA is below 15 mins. Avoid cancellation as it leads to food wastage.</Typography>
                        <Button variant="paragraphRegular" color="#FD5001" sx={{ paddingLeft:0,color:'#FD5001',lineHeight:'150%' }}>Read cancellation Policy</Button>
                    </Box>
                </SectionBox>
            </Box>
            <ProceedToPay />
        </RootContainer>
    )
}