import { useNavigate } from "react-router-dom";
import { Box, Button, IconButton, Typography } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import routesMapping from "@/routes.mapping";

export default function Header({ renderMain, renderRight, iconColor = "mainGray", ...props }) {
    const navigate = useNavigate()

    const handleBack = () => navigate(-1)

    const handleFAQ = () => navigate(routesMapping.FAQ)

    return (
        <Box {...props} py={4} display="flex" justifyContent="space-between" alignItems="center">
            <IconButton onClick={handleBack} sx={{ transform: "translateX(-10px)" }}>
                <ArrowBackIosNewIcon fontSize="small" color={iconColor} />
            </IconButton>
            {renderMain?
            <Box flexGrow="1">
                {renderMain}
            </Box>: null}
            {renderRight !== undefined? renderRight: 
            <Button onClick={handleFAQ} variant="text" startIcon={<InfoOutlinedIcon color={iconColor} />}>
                <Typography variant="smallRegular" fontFamily='Poppins' color={`${iconColor}.main`}>Help</Typography>
            </Button>}
        </Box>
    )
}