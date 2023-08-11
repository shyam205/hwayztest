import { useState } from "react";
import { Typography, styled, Box, Button } from "@mui/material";
import Header from "@/components/Header";
import { RootContainer } from "../pages.styles";
import images from "@/utilities/images";
import Notification from "./components/Notification";

const NotificationsContainer = styled(Box)(({ theme }) => ({
    boxShadow: "0px 15px 25px 0px #0000000D",
    borderRadius: 12,
    padding: `${theme.spacing(2)} ${theme.spacing(12)}`
}))

export default function Notifications() {
    const [notifications, setNotifications] = useState([
        {
            section: "Unread Messages",
            messages: [
                {
                    icon: images.NOTIFICATION_ICON,
                    title: "Halt alert",
                    description: "Your halt is arriving in next 7 mins",
                    time: new Date()
                },
            ]
        },
        {
            section: "Read Messages",
            messages: [
                {
                    icon: images.NOTIFICATION_ICON,
                    title: "Order confirm",
                    description: "Your order is confirmed by the restaurant",
                    time: new Date()
                },
                {
                    icon: images.NOTIFICATION_ICON,
                    title: "Welcome to the Hwayz",
                    description: "Wish you happy and safe journey",
                    time: new Date()
                },
            ]
        },
    ])
    return (
        <RootContainer px={10}>
            <Header renderMain={<Typography variant="heading6Medium">Notifications</Typography>} />
            {notifications.map(({ section, messages }, index) => (
                <Box key={section}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography color="rgba(147, 148, 151, 1)" mt={12} mb={8}>{section}</Typography>
                        {index === 0 && 
                        <Button variant="text">Clear all {">"}</Button>}
                    </Box>
                    <NotificationsContainer>
                        {messages.map(message => <Notification key={message.title} message={message} />)}
                    </NotificationsContainer>
                </Box>
            ))}
        </RootContainer>
    )
}