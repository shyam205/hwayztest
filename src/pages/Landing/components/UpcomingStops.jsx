import { Box,Typography,Badge, Stack, Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import images from "@/utilities/images";
import { SvgIcon,Drawer } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Radio from '@mui/material/Radio';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import useCustomer from '@/state/customer';
import amplitude from 'amplitude-js';

const UpcomingStopdetail = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    zIndex: '55',
    marginTop: '-25%',
    backgroundColor: 'white',
    borderRadius: '10px',
    width: '95%',
    padding:' 12px',
    boxSizing: 'border-box',
    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 0px 22px -12px'  
  }))  

  const ArrivalHaltingtext = styled(Typography)(({ theme }) => ({
    fontSize: '12px',
    lineHeight: '18px',
    fontWeight: 400,
    color: '#939497',
    fontFamily:'Poppins'
  }))

  const ArrivalHaltingTime = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    lineHeight: '150%',
    fontWeight: 500,
    color: '#0E0F13',
    fontFamily:'Poppins',
  }))

  const UpperSliderContent = styled(Box)(({ theme }) => ({
    '.slick-slide > div' : {
         margin:' 0 5px !important'
       },
       '.slick-list' : {
         margin:' 0 -5px !important'
       }
 })) 

  const SliderContent = styled(Box)(({ theme }) => ({
     '.slick-slide > div' : {
          margin:' 0 5px !important'
        },
        '.slick-list' : {
          margin:' 0 -5px !important'
        }
  })) 

  const CustomBadge = styled(Box)(({ theme }) => ({
    height: '22px',
    width: '22px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EF1C26',
    color: 'white',
    fontSize: '14px',
    fontWeight:500
 })) 

 const UpcomingText = styled(Typography)(({ theme }) => ({
    fontSize: '18px',
    lineHeight: '27px',
    fontWeight: 500,
    color: '#0E0F13',
    fontFamily:'Poppins'
 })) 

 const DrawerBadge = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '7px',
    color: '#fff',
    backgroundColor: '#FD5001',
    height: '22px',
    width: '22px',
    borderRadius: '50%',
    fontSize: '14px',
    fontWeight: 500,
    boxSizing :'border-box',
    marginLeft: '10px',
    fontFamily:'Poppins'
 })) 

 const Distance = styled(Typography)(({ theme }) => ({
    fontFamily: 'Poppins',
    width: '42px',
    lineHeight: '150%'
 })) 

 const Sliderwrapper = styled(Box)(({ theme }) => ({
    display: 'flex !important',
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'baseline' 
 })) 

 const Amenities = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    width: 'max-content'
 })) 

 const AmenitiesItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    width: '100%', 
 })) 


export default function Upcomingstop({upcoming_stop_list}) {
    //console.log("upcoming_stop_list ",upcoming_stop_list)
    const { setActivestop } = useCustomer(state => state)
    const [slider1, setSlider1] = useState(null);
    const [slider2, setSlider2] = useState(null);
    const [open, setOpen] = useState(false);
    const [amenities,setAmenities] = useState();

    //console.log("amenities ",amenities)
    const toggleDrawer = (x) => {
        setAmenities(x)
        setOpen(!open);
    };

    const handleSetActive = (x,id) => {
     //console.log("dfd",x)
     amplitude.getInstance().logEvent(`${x} Click`);
     setActivestop(x,id)
    }

  return (
    <Box sx={{ position:'relative' }}>
        {upcoming_stop_list &&  upcoming_stop_list.length > 0 && (
            <>
         <Box mt={10} sx={{ display:'flex',justifyContent:'left',alignContent:'center' }}>
                <UpcomingText>Upcoming stops</UpcomingText>
                <CustomBadge ml='9px'>{upcoming_stop_list?.length}</CustomBadge>
            </Box>
            
                <Box mt='5px' overflow='hidden'>
                    <UpperSliderContent>
                        <Slider
                            slidesToShow={1.5}
                            swipeToSlide={true}
                            dots={false}
                            centerMode={false}
                            infinite={false}
                            asNavFor={slider2}
                            ref={(slider) => setSlider1(slider)}
                        >
                            { upcoming_stop_list?.length > 0 && upcoming_stop_list?.map((item,i) => (
                            <Sliderwrapper key={i} data='1'>
                                <Box>
                                <Radio
                                checked={true}
                                    sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 12,
                                        color:`${item.nearby === true ? '#EF1C26' : '#0E0F13'}`,
                                    },
                                    height:'19px'
                                    }}
                                />
                                <Distance variant='smallRegular' sx={{ color: `${item.nearby === true ? '#EF1C26' : '#0E0F13'}` }}>{item.distance_from_origin}{item.distance_unit}</Distance>
                                </Box>
                                {/* <Box sx={{ border:'0.5px solid #939497',borderStyle:'dashed',flexGrow:1,transform:'translateY(-3px)' }}></Box> */}
                                <img src={images.LANDINGDASHEDLINE} style={{ transform:'translateY(-3px)',flexGrow:1 }} alt='dashed-line' />
                            </Sliderwrapper>
                            ))}
                        </Slider>
                    </UpperSliderContent>
                    <SliderContent mt='10px' overflow='hidden'>
                    <Slider
                    asNavFor={slider1}
                    className="image-carousel-secondary"
                    focusOnSelect={true}
                    ref={(slider) => setSlider2(slider)}
                    slidesToShow={2.5}
                    swipeToSlide={true}
                    centerMode={false}
                    infinite={false}
                    responsive={[
                        {
                            breakpoint: 565,
                            settings: {
                              slidesToShow: 2,
                            },
                        },
                        {
                            breakpoint: 450,
                            settings: {
                              slidesToShow: 1.5,
                            },
                        }
                    ]}
                    >
                    { upcoming_stop_list.length > 0 && upcoming_stop_list.map((item,i) => (
                    <Box key={i} sx={{ position:'relative',width:'max-content !important' }} onClick={() => handleSetActive(item.stop_name,item.id)}>
                        <Box height='111px' width='214px' borderRadius='15px' overflow='hidden'>
                            <img src={item.image || images.GOA_IMAGE} alt={item.stop_name} height='100%' width='100%' objectfit='cover' objectposition='center' />
                        </Box>
                        <UpcomingStopdetail mx='auto'>
                           <Typography>{item.stop_name}</Typography>
                           <Box sx={{ display:'flex',justifyContent:'space-between',mt:'5px' }}>
                               <Box>
                                   <ArrivalHaltingtext>Arrival at</ArrivalHaltingtext>
                                   <ArrivalHaltingTime>{item.arrival_time}</ArrivalHaltingTime>
                               </Box>
                               <Box>
                                   <ArrivalHaltingtext>Halting for</ArrivalHaltingtext>
                                   <ArrivalHaltingTime>{item.halt_duration} Mins</ArrivalHaltingTime>
                               </Box>
                           </Box>
                           <Box sx={{ textAlign:'center',mt:'15px' }}>
                              {/* <Amenities mx='auto' onClick={() => toggleDrawer(restaurant_list.amenity_list)}> */}
                              <Amenities mx='auto' onClick={() => toggleDrawer(item.amenity_list)}>
                              <Typography variant="smallRegular" sx={{ color: '#EF1C26',fontFamily:'Poppins' }}>Amenities </Typography>
                              <SvgIcon style={{ ml:'5px',color: '#EF1C26',fontSize:'16px' }}>
                                <KeyboardArrowDownIcon />
                              </SvgIcon>
                             
                              </Amenities>
                           </Box>
                           </UpcomingStopdetail>
                        </Box>
                    ))}
                    </Slider>
                    </SliderContent>
                </Box>
         
                {open && 
                <Drawer
                    anchor="bottom"
                    open={open}
                    onClose={toggleDrawer}
                    sx={{
                        maxWidth:'600px',
                        "& .MuiPaper-root": {
                            borderTopLeftRadius: '25px',
                            borderTopRightRadius: '25px',
                            overflow:'hidden',
                            maxWidth:'600px',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }
                      }}
                >
                    <Box px='20px' py='30px'>
                        <Stack flexDirection='row'>
                            <Typography variant='heading5Medium' color='#0E0F13' lineHeight='150%'>Amenities</Typography>
                            <DrawerBadge>{amenities?.length}</DrawerBadge>
                        </Stack>
                        <Box>
                              {
                                 amenities.length > 0 && amenities.map((item,i) => (
                                    <Box key={i}>
                                    <AmenitiesItem py='13px'>
                                        <Typography variant='paragraphRegular' color='#0E0F13' lineHeight='150%'>{item.amenity_name}</Typography>
                                        {/* <SvgIcon><BoltOutlinedIcon /></SvgIcon> */}
                                        <img src={item.logo} alt={item.amenity_name} />
                                    </AmenitiesItem>
                                    {amenities.length != i+1 && <Divider /> }
                                    </Box>
                                ))
                              }
                        </Box>
                    </Box>
                </Drawer>
            }
         </>
            )}   
    </Box>
  )
}

