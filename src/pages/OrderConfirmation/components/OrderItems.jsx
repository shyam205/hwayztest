import useStoreSelection from "@/state/selection";
import { Box, Button, Card, Typography, styled } from "@mui/material";
import CancelOrderPopup from "./CancelOrderPopup";
import { useState } from "react";

const TableCell = styled(Typography)(({ theme, color, headerText }) => ({
    color: color ?? theme.palette.mainGray.main,
    ...theme.typography?.[headerText? "smallMedium": "paragraphMedium"]
}))

const Row = styled(Box)(({ theme, rowHeader }) => ({
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(rowHeader? 6: 4),
    paddingBottom: rowHeader? theme.spacing(7): 0,
    borderBottom: rowHeader? "1px solid rgba(147, 148, 151, .6)": "none",
}))

export default function OrderItems() {
    const items = useStoreSelection(state => state.items)
    const [openCancelPopup, setOpenCancelPopup] = useState(false)

    const onOpen = () => setOpenCancelPopup(true)

    const onClose = () => setOpenCancelPopup(false)

    return (
        <>
            <Box mb={5} display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="heading5Medium">Order Items</Typography>
                <Button onClick={onOpen} variant="text">Cancel Order {">"}</Button>
            </Box>
            <Card sx={{ p: 10, pb: 7.5, mb: 10 }}>
                <Row rowHeader>
                    <TableCell headerText flex="1">Item</TableCell>
                    <TableCell headerText textAlign="center" width="10%">Qty</TableCell>
                    <TableCell headerText textAlign="right" width="20%">Amount</TableCell>
                </Row>
                {items.map(item => (
                    <Row key={item?.id}>
                        <TableCell flex="1">{item.name}</TableCell>
                        <TableCell textAlign="center" width="10%">1</TableCell>
                        <TableCell textAlign="right" width="20%">{(item.qty*item.price)?.formatMoney?.()}</TableCell>
                    </Row>
                ))}
                <Box display="flex" justifyContent="center">
                    <Button variant="text">+ Add more items</Button>
                </Box>
            </Card>
            <CancelOrderPopup
                open={openCancelPopup}
                onClose={onClose}
            />
        </>
    )
}