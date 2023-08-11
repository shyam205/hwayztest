import { useState } from "react";
import { Box, Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Header from "@/components/Header";
import { RootContainer } from "../pages.styles";
import { ContactInfoSchema } from "@/schemas/contactInfo";
import CustomInput from "@/components/CustomInput";
import OTPModal from "./components/OTPModal";
import useCustomer from "@/state/customer";
import { useNavigate } from "react-router-dom";
import routesMapping from "@/routes.mapping";

export default function ContactInfo() {
    const { register, control, formState: { errors, isSubmitting }, handleSubmit } = useForm({
        resolver: yupResolver(ContactInfoSchema)
    })
    const [otpOpen, setOTPOpen] = useState(false)
    const setCustomerDetails = useCustomer(state => state.setCustomerDetails)
    const navigate = useNavigate()

    const proceedWithPayment = async () => {
        setOTPOpen(true)
    }

    const handleOTPSubmit = async ({ name, whatsappNo }) => {
        try {
            setCustomerDetails(name, whatsappNo)
            navigate(routesMapping.PAYMENT_OPTIONS)
        }
        finally {
            setOTPOpen(false)
        }
    }

    return (
        <RootContainer display="flex" flexDirection="column">
            <Box px={10}>
                <Header />
                <Typography mb={16} variant="heading5Bold" lineHeight="27px">Enter your details to make payment successfully!</Typography>
                <Box mb={6}>
                    <Typography mb={4} variant="paragraphRegular">Enter your name</Typography>
                    <CustomInput
                        {...register("name")}
                        startAdornment={<PersonOutlineIcon color="#656B81" />}
                        placeholder="Enter full name"
                    />
                    {!!errors.name && <Typography color="error" variant="tinyMedium">{errors.name.message}</Typography>}
                </Box>
                <Box mb={6}>
                    <Typography mb={4} variant="paragraphRegular">Whatsapp Number</Typography>
                    <CustomInput
                        inputProps={{
                            maxLength: 10,
                        }}
                        {...register("whatsappNo")}
                        startAdornment={<CallOutlinedIcon color="#656B81" />}
                        placeholder="Enter your WhatsApp number"
                    />
                    {!!errors.whatsappNo && <Typography color="error" variant="tinyMedium">{errors.whatsappNo.message}</Typography>}
                </Box>
            </Box>
            <Box px={10} pb={8} display="flex" flexDirection="column" justifyContent="flex-end" flexGrow="1">
                <FormControlLabel
                    sx={{ display: "block" }}
                    control={<Checkbox {...register("tnc")} />}
                    label="Terms and conditions apply"
                />
                {!!errors.tnc && <Typography mb={4} mt={-2} color="error" variant="tinyMedium">{errors.tnc.message}</Typography>}
                <Button disabled={isSubmitting} onClick={handleSubmit(proceedWithPayment)} fullWidth variant="contained" endIcon={<ArrowForwardIcon />}>
                    Continue
                </Button>
            </Box>
            <OTPModal
                handleOTPSubmit = {handleSubmit(handleOTPSubmit)}
                onClose={() => setOTPOpen(false)}
                open={otpOpen}
                control={control}
            />
        </RootContainer>
    )
}