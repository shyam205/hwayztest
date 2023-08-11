import { RootContainer } from "@/pages/pages.styles";
import { GEOLOCATION_ERROR, GEOLOCATION_MESSAGES } from "@/utilities/location";
import { Button, Typography } from "@mui/material";

export default function GeoError({ handleRetry, errorCode }) {
    return (
        <RootContainer display="flex" justifyContent="center" flexDirection="column" alignItems="center">
            <Typography textAlign="center" variant="h1">Ohh no!</Typography>
            <Typography mt={4} px={10} textAlign="center">{GEOLOCATION_MESSAGES[errorCode]}</Typography>
            {errorCode !== GEOLOCATION_ERROR.DENIED && <Button onClick={handleRetry}>Retry</Button>}
        </RootContainer>
    )
}