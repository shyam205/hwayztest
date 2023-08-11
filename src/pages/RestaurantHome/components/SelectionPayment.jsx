import { useNavigate } from 'react-router-dom';
import { shallow } from 'zustand/shallow'
import { Box, Button, Slide, Typography, styled } from "@mui/material";
import useStoreSelection from "@/state/selection";
import routesMapping from '@/routes.mapping';

const FixedBox = styled(Box)(({ theme }) => ({
    position: "fixed",
    [theme.breakpoints.down("sm")]: {
        width: "100%",
    },
    width: 600,
    bottom: 0,
}))

const WrappedBox = styled(Box)(({ theme }) => ({
    background: "white",
    boxSizing: "border-box",
    boxShadow: "0px -8px 20px 0px #0000001A",
    borderTopLeftRadius: theme.spacing(8),
    borderTopRightRadius: theme.spacing(8),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${theme.spacing(6)} ${theme.spacing(12)}`,
    width: "100%",
}))

export default function SelectionPayment() {
  
    const total = useStoreSelection(state => state.items?.reduce((acc, item) => {
        return acc+(item.qty ?? 0)*(item.item_price)
    }, 0), shallow)
    const totals = useStoreSelection(state => state.items)
    // console.log("totals ",totals)
    const itemCount = useStoreSelection(state => state.items?.reduce((acc, item) => {
        return acc+item?.qty ?? 0
    }, 0), shallow)
    const navigate = useNavigate()

    const goToPayment = () => navigate(routesMapping.CONFIRM_SELECTION)

    return (
        <Slide direction="up" in={!!itemCount}>
            <FixedBox maxWidth="sm">
                <WrappedBox onClick={goToPayment}>
                    <Box>
                        <Typography color="mainGray.main" variant="smallMedium">{itemCount} item{itemCount > 1? "s": ""}</Typography>
                        <Typography variant="heading5Bold">{total?.formatMoney()}</Typography>
                    </Box>
                    <Button sx={{ px: 18, py: 6, fontSize: 16 }} variant="gradient">Next</Button>
                </WrappedBox>
            </FixedBox>
        </Slide>
    )
}