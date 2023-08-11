import images from "@/utilities/images"
import { Box, Button, Typography, styled } from "@mui/material"

const ImageContainer = styled(Box)`
    width: 120px;
    aspect-ratio: 1 / 1;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
`

const Image = styled("img")`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const ItemDescription = styled(Box)`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(0deg, #000000 1.71%, rgba(0, 0, 0, 0) 73.61%);
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 8px;
    box-sizing: border-box;
`

export default function RecommendedItem() {
    return (
        <ImageContainer>
            <Image src={images.STORE_IMAGE} alt="Recommended" />
            <ItemDescription>
                <Box>
                    <Typography variant="smallMedium" color="white">Green salad</Typography>
                    <Typography variant="smallRegular" color="white">{(120).formatMoney()}</Typography>
                </Box>
                <Button sx={{ fontSize: 12 }} variant="text">Add</Button>
            </ItemDescription>
        </ImageContainer>
    )
}