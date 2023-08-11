import useStoreSelection from "@/state/selection";
import { getTotalPayment } from "@/utilities/calculations";
import images from "@/utilities/images";
import { Box, Card, Typography, styled } from "@mui/material";
import { shallow } from "zustand/shallow";

const RowBetween = styled(Box)(({ theme, hasBorder }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "&:not(:last-child)": {
        marginBottom: theme.spacing(6)
    },
    ...(hasBorder && {
        background: `url(${images.DASHED_BORDER})`,
        backgroundPosition: "top center",
        backgroundSize: "100%",
        backgroundRepeat: "repeat-x",
        paddingTop: theme.spacing(6)
    })
}))

const RowText = styled(Typography)(({ theme, isValue, color }) => ({
    color: theme.palette[color? color: isValue? "textBlack": "mainGray"].main,
    ...theme.typography[isValue? "heading6Medium": "paragraphRegular"],
}))

export default function BillDetails() {
    const total = useStoreSelection(state => state.items?.reduce((acc, item) => {
        return acc+(item.qty ?? 0)*(item.price)
    }, 0), shallow)
    const { gst, platformFees, totalToPay } = getTotalPayment(total)

    return (
        <>
            <Typography mb={5} variant="heading5Medium">Bill Details</Typography>
            <Card>
                <Box sx={{ padding: 10, paddingBottom: 7.5 }}>
                    <RowBetween>
                        <RowText>Item Total</RowText>
                        <RowText isValue>{total?.formatMoney?.()}</RowText>
                    </RowBetween>
                    <RowBetween>
                        <RowText>Platform fee</RowText>
                        <RowText isValue>{platformFees?.formatMoney?.()}</RowText>
                    </RowBetween>
                    <RowBetween>
                        <RowText>GST and restaurant charge</RowText>
                        <RowText isValue>{gst?.formatMoney?.()}</RowText>
                    </RowBetween>
                    <RowBetween hasBorder>
                        <RowText color="textBlack">Amount Paid</RowText>
                        <RowText isValue>{totalToPay?.formatMoney?.()}</RowText>
                    </RowBetween>
                    <RowBetween hasBorder>
                        <Box>
                            <Typography variant="paragraphMedium">Payment status</Typography>
                            <Typography color="mainGray.main" variant="paragraphRegular">Txn ID: 101</Typography>
                        </Box>
                        <RowText color="success" isValue>Paid</RowText>
                    </RowBetween>
                </Box>
            </Card>
        </>
    )
}