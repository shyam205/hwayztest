import useStoreSelection from "@/state/selection";
import { Box, Button, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import ProductCounter from "@/components/ProductCounter";
import { SectionBox } from "../page.styles";

const Row = styled(Box)`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    & > .productName {
        flex-grow: 1;
    }
    &:not(:last-child) {
        margin-bottom: 12px;
    }
`

const SIZE=14
const ProductType = styled(Box)(({ theme }) => ({
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE/3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: `1px solid gray`,
    top: 2,
    position: 'relative',
    marginRight: theme.spacing(4),
    "&::after": {
        width: SIZE-4,
        height: SIZE-4,
        borderRadius: "50%",
        content: "' '",
        backgroundColor: "red",
    }
}))

export default function SelectedProducts() {
    const items = useStoreSelection(state => state.items)
    const navigate = useNavigate()

    const goBack = () => navigate(-1)

    return (
        <SectionBox>
            <Box>
                {items.map(item => (
                    <Row key={item.id}>
                        <Box display="flex" alignItems="flex-start">
                            <ProductType />
                            <Box>
                                <Typography variant="paragrahMedium" sx={{ fontSize:'14px',fontWeight:500 }}>{item.item_name}</Typography>
                                <Typography mt={1} variant="heading6Semibold">{(item.qty*item.item_price).formatMoney?.()}</Typography>
                            </Box>
                        </Box>
                        <ProductCounter sx={{ marginX: 5 }} isabsolute={false} product={item} />
                    </Row>
                ))}
            </Box>
            <Box textAlign="center" pt={4} pb='17px'>
                <Button onClick={goBack} startIcon={<AddIcon fontSize="small" />} sx={{ fontSize:'14px',fontWeight:'400',fontFamily:'Poppins' }}>Add more items</Button>
            </Box>
        </SectionBox>
    )
}