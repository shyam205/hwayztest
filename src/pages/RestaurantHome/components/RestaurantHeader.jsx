import { memo } from "react";
import { shallow } from "zustand/shallow";
import { Box, ButtonBase, Typography, styled } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import dayjs from "dayjs";
import Header from "@/components/Header";
import images from "@/utilities/images";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const imagegallery = [
    {
        id:1,
        imageurl: images.GOA_IMAGE
    },
    {
        id:2,
        imageurl: images.SATARA_IMAGE
    },
    {
        id:3,
        imageurl: images.STORE_IMAGE
    },
    {
        id:4,
        imageurl: images.GOA_IMAGE
    },
    {
        id:5,
        imageurl: images.SATARA_IMAGE
    },
]
const ImageBackground = styled(Box)`
    width: 100%;
    height: 40%;
    background-image: ${({ bg }) => `url(${bg})`};
    background-size: cover;
    position: relative;
    border-bottom-left-radius: 36px;
    border-bottom-right-radius: 36px;
    &::before {
        content: " ";
        position: absolute;
        top: 0;
        width: 100%;
        height: 60%;
    }
`

const RestaurantData = styled(Box)(({ theme }) => ({
    borderRadius: 12,
    padding: `${theme.spacing(10)} ${theme.spacing(12)}`,
    position: "relative",
    background: "white",
    boxShadow: "0px 15px 25px 0px #0000000D",
}))

const FeatureList = styled("ul")`
    display: flex;
    flex-wrap: wrap;
    column-gap: ${({ theme }) => theme.spacing(14)};
    padding: ${({ theme }) => `${theme.spacing(8)} ${theme.spacing(6)}`};
    border-top: 1px solid rgba(147, 148, 151, .3);
    border-bottom: 1px solid rgba(147, 148, 151, .3);
`

const PreviewImageContainer = styled(ButtonBase)(({ isButton, extraImages }) => ({
    // width: "calc(25% - 3 * 5px)",
    width:'62px',
    height:'62px',
    aspectRatio: 1 / 1,
    borderRadius: "4px",
    overflow: "hidden",
    "& > img": {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    "&::after": {
        position: "absolute",
        content: `"${extraImages}"`,
        background: "rgba(14, 15, 19, .6)",
        display: isButton? "flex": "none",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        color: 'white',
        fontSize: 16
    }
}))

const Galleybox = styled(Box)(({ theme }) => ({
    '& .slick-dots' : {
        height: 'max-content',
        bottom: '-20px',
        zIndex: 5
    },
    '& .slick-dots li button:before' : {
        fontSize: '11px !important',
        color:'#f9f9f9'
    },
    '& .slick-dots .slick-active button:before' : {
         color:'#fff !important'
    }
}))

export default function RestaurantHeader({ store }) {
    const [gallery,setGallery] = useState(false)
    const [imgdata,setImgdata] = useState('')
    const [imgid,setImgd] = useState('')
    const handleSelectedGallery = (img) => {
        console.log("ewew")
      setGallery(true)
      setImgdata(img.imageurl)
      setImgd(img.id)
    }

    const handleClosegallery = () => {
        setGallery(false)
        setImgdata('')
    }
    const IMAGES = new Array(imagegallery.length).fill(0)
    return (
        <ImageBackground bg={images.PINK_BACKGROUND}>
            <Box px={10}>
                <Header iconColor="textBlack" />
            </Box>
            <RestaurantData mx={10}>
                <Box sx={{ display:"flex",justifyContent:'left',alignItems:'center' }}>
                    <Box sx={{ width:'9px',height:'9px',backgroundColor:store?.non_veg_available === true ? '#EF1C26' : '#04994C',borderRadius:'50%' }}></Box>
                    <Box ml='4px'><Typography variant="smallRegular" fontFamily='Poppins' color={store?.non_veg_available === true ? '#EF1C26' : '#04994C'}>{store?.non_veg_available === true ? 'Non-veg' : 'Veg' }</Typography></Box>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mt='7px'>
                    <Typography variant="heading5Medium">{store.trade_name}</Typography>
                    {/* <Typography color="mainGray.main" variant="paragraphMedium">ETA {dayjs("2024-01-02").format("h:mm A")}</Typography> */}
                    <Typography color="mainGray.main" variant="paragraphRegular">ETA {store.ETA || dayjs("2024-01-02").format("h:mm A")}</Typography>
                </Box>
                <Typography mt={4} mb={5} variant="heading5Semibold">{store.amount_estimation?.formatMoney?.()} for 1</Typography>
                <Box
                    display="flex"
                    alignItems="center"
                >
                    <StarIcon fontSize="small" color="warning" />
                    <Typography color="warning.main" ml={2} mr={8} variant="paragraphMedium">{store.rating}</Typography>
                    <Typography variant="paragraphRegular">{store.review_count} reviews</Typography>
                </Box>
                <FeatureList>
                    {store.amenity_list.map((feature,i) => <Typography color="primary" variant="smallRegular" key={i} as="li">{feature.amenity_name}</Typography>)}
                </FeatureList>
                <Box
                    display="flex"
                    flexWrap="wrap"
                    columnGap="12px"
                    rowGap="20px"
                >
                    {/* {store.image_list.slice(0, 4).map((image, index, arr) => { */}
                    {imagegallery.slice(0, 4).map((item, index, arr) => {
                        const isLast = index === arr.length-1
                        const extraImages = `${IMAGES.length-4}+`
                        return (
                            // <PreviewImageContainer key={`container-${index}`} extraImages={extraImages} isButton={isLast} disabled={!isLast} onClick={() => handleSelectedGallery(images.STORE_IMAGE)}>
                            //     <img src={image.new_photo_url || images.STORE_IMAGE} data={index} alt="Store preview" />
                            // </PreviewImageContainer>
                            <PreviewImageContainer key={`container-${index}`} extraImages={extraImages} isButton={isLast} onClick={() => handleSelectedGallery(item)}>
                                <img src={item.imageurl} data={index} alt="Store preview" />
                            </PreviewImageContainer>
                        )
                    })}
                </Box>
                {gallery && 
                <Box
                mx='auto'
                sx={{
                    height:'100vh',
                    width:'100%',
                    maxWidth:'600px',
                    backgroundColor:'rgba(0, 0, 0, 0.80)',
                    position:'fixed',
                    top:0,
                    left:'50%',
                    transform:'translateX(-50%)',
                    zIndex:6
                }}
                >
                  <Box 
                  sx={{
                   display:'flex',
                   justifyContent:'center',
                   alignItems:'center',
                   height:'100vh'
                  }}>
                    <Box>
                    <Box display='flex' justifyContent='center' sx={{mb:'16px' }}>
                        <img src={images.CANCELGALLRYICON} heigh='40px' width='40px' alt='cancel' style={{ cursor:'pointer' }} onClick={handleClosegallery} />
                    </Box>
                    <Galleybox
                    sx={{
                        width: '390px',
                        height: '330px',
                        borderRadius: '15px',
                        overflow: 'hidden'
                    }}
                    >
                        {/* <img src={imgdata} height='100%' width='100%' objectFit='cover' objectPosition='center' alt='gallery' /> */}
                        <Slider
                            slidesToShow={1}
                            swipeToSlide={true}
                            dots={true}
                            centerMode={true}
                            infinite={true}
                            fade= {true}
                            cssEase= {'linear'}
                            speed= {500}
  
                        >

                        {imagegallery.length > 0 && imagegallery.map((item,i) => (
                            <Box key={i}
                            sx={{
                                width: '298px',
                                height: '287px',
                                borderRadius: '15px',
                                overflow: 'hidden'
                            }}
                            >
                                <img src={item.imageurl} height='100%' width='100%' objectFit='cover' objectPosition='center' alt='gallery' />
                            </Box>
                        ))}
                        </Slider>
                    </Galleybox>
                    {/* <Box sx={{ display:'flex',justifyContent:'center',transform:'translateY(15px)' }}>
                        <Box sx={{ display:'flex',justifyContent:'left',columnGap:'10px' }}>
                        {imagegallery.map((item,i) => (
                            <Box key={i} data={i} sx={{ height:'9px',width:'9px',borderRadius:'50%',backgroundColor:item.id == imgid ? '#fff' : 'rgba(249,249,249,0.5)',cursor:'pointer' }} onClick={() =>handleSelectedGallery(item)}></Box>
                        ))}
                        </Box>
                    </Box> */}
                  </Box>
                  </Box>
                </Box>
                
                }
            </RestaurantData>
        </ImageBackground>
    )
}