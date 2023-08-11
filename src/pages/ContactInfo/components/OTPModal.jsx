import routesMapping from "@/routes.mapping";
import { ArrowForward } from "@mui/icons-material";
import { Box, Button, Dialog, Typography, styled } from "@mui/material";
import { useState } from "react";
import { useWatch } from "react-hook-form";
import OTPInput from 'react-otp-input'
import { useNavigate } from "react-router-dom";

const StyledInput = styled("input")(({ theme }) => ({
    width: "40px !important",
    height: 40,
    borderRadius: 4,
    border: "1px solid #A1A1A1"
}))

export default function OTPModal({ open, onClose, control, handleOTPSubmit }) {
    const mobile = useWatch({ name: "whatsappNo", control })
    const [otp, setOTP] = useState("")
    const navigate = useNavigate()
    
    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <Box p={8}>
                <Typography textAlign="center" variant="heading5Bold">Enter valid OTP</Typography>
                <Typography mt={6} mb={12} textAlign="center" variant="heading6Medium">Please enter valid OTP received on +91 {mobile}</Typography>
                <OTPInput
                    value={otp}
                    onChange={setOTP}
                    numInputs={4}
                    renderInput={props => <StyledInput {...props} />}
                    containerStyle={{
                        display: "flex",
                        justifyContent: "center",
                        columnGap: 4,
                        margin: "1.5rem 0"
                    }}
                />
                <Box mb={8} display="flex" justifyContent="center">
                    <Typography mr={4}>Didn't receive yet?</Typography>
                    <Button variant="text" sx={{ padding: 0 }}>Resend OTP</Button>
                </Box>
                <Button onClick={handleOTPSubmit} fullWidth variant="contained" endIcon={<ArrowForward />}>Verify & Pay</Button>
            </Box>
        </Dialog>
    )
}