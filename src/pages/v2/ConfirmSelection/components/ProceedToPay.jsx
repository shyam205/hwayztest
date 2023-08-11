import routesMapping from "@/routes.mapping"
import useCustomer from "@/state/customer"
import useStoreSelection from "@/state/selection"
import { getTotalPayment } from "@/utilities/calculations"
import { Box, Button, styled } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { shallow } from "zustand/shallow"

const ProceedSection = styled(Box)(({ theme }) => ({
    position: "fixed",
    bottom: 0,
    background: "#fff",
    [theme.breakpoints.down("sm")]: {
        width: "100%",
    },
    width: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxSizing: "border-box",
    boxShadow: "4px 0px 4px 0px #00000040",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
}))

export default function ProceedToPay() {
    const navigate = useNavigate()
    const { updatecart } = useCustomer(state => state) 
    const total = useStoreSelection(state => state.items?.reduce((acc, item) => {
        return acc+(item.qty ?? 0)*(item.item_price)
    }, 0), shallow)
    const { totalToPay } = getTotalPayment(total)

    const getContactInfo = () => navigate(routesMapping.USER_INFO)

    return (
        <ProceedSection onClick={getContactInfo} px={4} py={6}>
            <Button fullWidth variant="gradient" sx={{ padding:'12px',fontFamily:'poppins',fontSize:'16px',fontWeight:'500',lineHeight:'150%' }}>Pay {updatecart?.invoice_details?.payable_amount?.formatMoney?.()}</Button>
        </ProceedSection>
    )
}