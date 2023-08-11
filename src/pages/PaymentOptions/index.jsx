import { useState } from "react";
import { Box, Button, ButtonBase, RadioGroup, Typography, styled } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { RootContainer } from "../pages.styles";
import UPIOption from "./components/UPIOption";
import SelectionHeader from "@/components/SelectionHeader";
import { useNavigate } from "react-router-dom";

const OPTIONS = [
    "Google Pay",
    "PhonePe",
    "PayTM",
    "BHIM"
]

const AddUPIButton = styled(ButtonBase)(({ theme }) => ({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: `${theme.spacing(8)} ${theme.spacing(10)}`,
    width: "100%",
}))

const IconContainer = styled(Box)`
    width: 30px;
    height: 30px;
    display: grid;
    place-items: center;
    border-radius: 5px;
    border: 1px solid #979797;
    box-sizing: border-box;
`

export default function PaymentOptions() {
    const [option, setOption] = useState(OPTIONS[0])
    
    const handleChange = e => {
        setOption(e.target.value)
    }
    const navigate = useNavigate()
    
    return (
        <RootContainer bgcolor="#E7E7E7 !important">
            <SelectionHeader />
            <Box px={10}>
                <Typography variant="heading5Bold" my={8}>UPI</Typography>
                <Box
                    bgcolor="white"
                    borderRadius={4}
                    overflow="hidden"
                >
                    <RadioGroup
                        name="upiOption"
                        value={option}
                        onChange={handleChange}
                    >
                        {OPTIONS.map(option => (
                            <UPIOption
                                key={option}
                                option={option}
                            />
                        ))}
                    </RadioGroup>
                    <AddUPIButton>
                        <IconContainer>
                            <AddIcon fontSize="small" />
                        </IconContainer>
                        <Box ml={5} textAlign="left">
                            <Typography mb={4} variant="paragraphMedium">Add New UPI ID</Typography>
                            <Typography variant="smallMedium">You need to have a registered UPI ID</Typography>
                        </Box>
                    </AddUPIButton>
                </Box>
                <Box sx={{ textAlign:'center' }}>
                <Button onClick={() => navigate('/payments')} variant="contained" sx={{ mt:'15px' }}>Payment</Button>
                </Box>
            </Box>
        </RootContainer>
    )
}