import { Box, Stack, Typography, styled } from "@mui/material";
import dayjs from "dayjs";

const StyledImage = styled("img")(({ theme }) => ({
    width: 40,
    height: 40,
    marginRight: theme.spacing(4),
    marginTop: theme.spacing(2)
}))

const NotificationRoot = styled(Stack)`
    &:not(:last-child) {
        border-bottom: 1px solid rgba(147, 148, 151, .3);
    }
`

export default function Notification({ message }) {
    const { icon, title, description, time } = message
    return (
        <NotificationRoot direction="row" py={10}>
            <StyledImage src={icon} alt={`${title} Notification`} />
            <Box>
                <Typography variant="paragraphMedium">{title}</Typography>
                <Typography my={4} variant="smallRegular">{description}</Typography>
                <Typography variant="smallRegular">{dayjs(time).fromNow()}</Typography>
            </Box>
        </NotificationRoot>
    )
}