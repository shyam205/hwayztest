import { RootContainer } from "@/pages/pages.styles";
import images from "@/utilities/images";
import { Box } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

export default function PageLoader() {
    return (
        <RootContainer
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ backgroundColor:'#fff' }}
        >
            <Box display="flex"
            justifyContent="center"
            alignItems="center" width='100%' maxWidth='600px' height='100vh' sx={{ backgroundColor:'white' }}>
            {/* <img src={images.Companylogo} alt="Hwayz splash" /> */}
            <CircularProgress color="inherit" />
            </Box>
        </RootContainer>
    )
}