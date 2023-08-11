import { Box, Typography, styled } from "@mui/material";
import { SectionBox } from "../page.styles";
import { getTotalPayment } from "@/utilities/calculations";
import useStoreSelection from "@/state/selection";
import { shallow } from "zustand/shallow";
import images from "@/utilities/images";
import useCustomer from "@/state/customer";
import { useEffect } from "react";

const RowBetween = styled(Box)(({ theme, hasBorder }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: theme.typography.small.fontSize,
    "&:not(:last-child)": {
        marginBottom: "8px",
    },
    ...(hasBorder && {
        background: `url(${images.DASHED_BORDER})`,
        backgroundPosition: "top center",
        backgroundSize: "100%",
        backgroundRepeat: "repeat-x",
        paddingTop: theme.spacing(6)
    })
}))

export default function BillDetails() {
    const { updatecart } = useCustomer(state => state) 
    
    const total = useStoreSelection(state => state.items?.reduce((acc, item) => {
        return acc+(item.qty ?? 0)*(item.item_price)
    }, 0), shallow)
    const { gst, platformFees, totalToPay } = getTotalPayment(total)
  
    return (
        <SectionBox>
            <Box>
                <RowBetween>
                    <Typography variant="paragraphRegular" color='#939497' fontFamily='Poppins' lineHeight='150%'>Item total</Typography>
                    <Typography variant="heading6Medium" color='#0E0F13' fontFamily='Poppins' lineHeight='150%'>{updatecart?.invoice_details?.item_total?.formatMoney?.()}</Typography>
                </RowBetween>
                <RowBetween>
                    <Typography variant="paragraphRegular" color='#939497' fontFamily='Poppins' lineHeight='150%'>Platform Fee</Typography>
                    <Typography variant="heading6Medium" color='#0E0F13' fontFamily='Poppins' lineHeight='150%'>{updatecart?.invoice_details?.platform_fee?.formatMoney?.()}</Typography>
                </RowBetween>
                <RowBetween>
                    <Typography variant="paragraphRegular" color='#939497' fontFamily='Poppins' lineHeight='150%'>GST and Restaurant Charges</Typography>
                    <Typography variant="heading6Medium" color='#0E0F13' fontFamily='Poppins' lineHeight='150%'>{updatecart?.invoice_details?.gst_restaurant_charges?.formatMoney?.()}</Typography>
                </RowBetween>
            </Box>
            <Box mt={theme => theme.spacing(-9)}>
                <RowBetween hasBorder>
                    <Typography variant="paragraphMedium">To Pay</Typography>
                    <Typography variant="heading6Medium">{updatecart?.invoice_details?.payable_amount?.formatMoney?.()}</Typography>
                </RowBetween>
            </Box>
        </SectionBox>
    )
}