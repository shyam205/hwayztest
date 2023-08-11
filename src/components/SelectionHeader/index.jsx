import { useRef } from 'react'
import { useLocation } from "react-router-dom";
import { Box, Typography, styled } from "@mui/material";
import Header from "../Header";
import useStoreSelection from "@/state/selection";
import routesMapping from "@/routes.mapping";
import images from "@/utilities/images";

const ETATimer = styled(Box)(({ theme }) => ({
    borderTop: `1px solid ${theme.palette.lightGray.main}`,
    padding: `${theme.spacing(8)} ${theme.spacing(10)}`,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    display: "flex",
    alignItems: "center",
    boxShadow: "0px 1px 4px 0px #0000001A;",
    background: "white",
}))

const Icon = styled("img")`
    width: 20px;
    height: 20px;
    margin-right: 4px;
`

export default function SelectionHeader() {
    const pathname = useLocation().pathname
    const totalRef = useRef(useStoreSelection.getState().items?.reduce((acc, item) => {
        return acc+(item.qty ?? 0)*(item.price)
    }, 0))
    const countRef = useRef(useStoreSelection.getState().items?.reduce((acc, item) => {
        return acc+item?.qty ?? 0
    }, 0))
    
    return (
        <>
            <Box bgcolor="white" px={10} py={4} boxShadow="box-shadow: 0px 1px 4px 0px #0000001A;">
                <Header
                    renderMain={
                        pathname.includes(routesMapping.CONFIRM_SELECTION)?
                            <Typography variant="heading5Bold">Nandi Grand</Typography>:
                            <Box>
                                <Typography>Payment Options</Typography>
                                <Typography mt={2} variant="tinyBold">{countRef.current} Items | Total {totalRef.current}</Typography>
                            </Box>
                    }
                />
            </Box>
            <ETATimer mb={20}>
                <Icon src={images.LOCATION_ICON} alt="Location timer" />
                <Typography color="darkGray" variant="paragraphMedium">ETA 21:30 IST | Hosakote, 60.0km</Typography>
            </ETATimer>
        </>
    )
}