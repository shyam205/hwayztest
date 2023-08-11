import images from "@/utilities/images";
import { Box, Button, Dialog, Typography, styled } from "@mui/material";

const Img = styled("img")`
    width: 76px;
    aspect-ratio: 78 / 92;
`

const SubmitButton = styled(Button)(({ theme, isRight }) => ({
    width: "36%",
    marginLeft: isRight? theme.spacing(6): 0,
}))

const NegativeButton = styled(SubmitButton)(({ theme }) => ({
    borderRadius: 50
}))

export default function CancelOrderPopup(props) {
    return (
        <Dialog
            {...props}
            maxWidth="md"
        >
            <Box
                textAlign="center"
                py={10}
                borderRadius={12}
            >
                <Img src={images.CANCEL_LOGO} alt="Cancel Logo" />
                <Typography mx={20} mt={10} mb={13.5} variant="heading5Bold" textAlign="center">Are you sure you want to cancel the order?</Typography>
                <Box display="flex" justifyContent="center">
                    <NegativeButton color="mainGray" onClick={props.onClose} variant="outlined">No</NegativeButton>
                    <SubmitButton isRight variant="gradient">Yes</SubmitButton>
                </Box>
            </Box>
        </Dialog>
    )
}