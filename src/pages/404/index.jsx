import { Typography } from "@mui/material";
import { RootContainer } from "../pages.styles";

export default function NotFound() {
    return (
        <RootContainer display="flex" justifyContent="center" flexDirection="column" alignItems="center">
            <Typography textAlign="center" variant="h1">404</Typography>
            <Typography textAlign="center" mt={4} px={10} variant="h2">Not found!</Typography>
        </RootContainer>
    )
}