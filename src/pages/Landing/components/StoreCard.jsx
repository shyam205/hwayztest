import images from "@/utilities/images";
import { Box, Typography } from "@mui/material";
import { styled } from '@mui/material/styles'
import { Link } from "react-router-dom";

const Root = styled(Link)`
    text-decoration: none;
    color: black;
    display: flex;
    position: relative;
    column-gap: ${({ theme }) => theme.spacing(10)};
    width: 100%;
    height: 128px;
    transition: .25s all;
    cursor: pointer;
    border: none;
    outline: none;
    background: white;
    font-family: 'poppins';
    padding: 0;
    &:not(:last-child) {
        margin-bottom: 16px;
    }
    &:hover {
        transform: scale(.99);
    };
    &:active {
        transform: scale(.98);
    }
`

const StoreImage = styled("img")`
    height: 128px;
    border-radius: 8px;
    width: 20%;
    object-fit: cover;
`

const Pill = styled(Box)(({ theme, ...props }) => ({
    borderRadius: "20px",
    backgroundColor: props.bg? theme.palette?.[props.bg]?.main: "#E7E7E7",
    padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
    fontSize: theme.typography.tiny.fontSize,
    textAlign: "center",
    color: "white"
}))

export default function StoreCard({ store }) {
    const { name, id = "Hello World" } = store ?? {}

    return (
        <Root to={`/restaurant-home/${id}`}>
            <StoreImage loading="lazy" src={images.STORE_IMAGE} alt={name} />
            <Box height="100%" display="flex" flexDirection="column" flex="1" justifyContent="space-between" alignItems="flex-start">
                <Typography>Nandi Grand</Typography>
                <Typography variant="small" textOverflow="ellipsis">South Indian, Andhra, Multicuisine...</Typography>
                <Typography variant="small">Hosakote, 60.0 km</Typography>
                <Typography variant="small" fontWeight="bold">4.5 (200+) ETA 21:30 IST Rs. 250 for two</Typography>
                <Pill>
                    Accepting orders
                </Pill>
            </Box>
            <Pill sx={{ position: "absolute", top: 5, right: 10 }} bg="success">
                Accepting orders
            </Pill>
        </Root>
    )
}