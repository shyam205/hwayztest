import React, { useState } from 'react'
import { Box, Typography, Badge } from "@mui/material";
import { styled } from '@mui/material/styles'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import StarIcon from '@mui/icons-material/Star';
import images from "@/utilities/images";
import { SvgIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useCustomer from '@/state/customer';


const Restaurentwrapper = styled(Box)(({ theme }) => ({
    position: 'relative',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '244px',
    backgroundPosition: 'center',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
  })) 

  const Restaurenttextwrapper = styled(Box)(({ theme }) => ({
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: '100%',
      cursor: 'pointer'
  })) 

  const AlignBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
}))  

const Ratingtext = styled(Typography)(({ theme }) => ({
    color: '#FEB63B',
    fontSize: '14px',
    fontFamily:'Poppins'
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

 const RedDot = styled(Box)(({ theme }) => ({
    border: '2px solid #FD5001',
    height: '1px',
    width: '1px',
    backgroundColor: '#FD5001',
    borderRadius: '50%'
 })) 
 
 const Placename = styled(Typography)(({ theme }) => ({
    color: '#0E0F13',
    textTransform: 'capitalize',
    fontWeight: 600,
    fontFamily: 'Poppins'
 }))  

 const Price = styled(Typography)(({ theme }) => ({
    color: '#0E0F13',
    textTransform: 'capitalize',
    fontWeight: 600,
    fontFamily: 'Poppins'
 })) 

export default function RestaurantList({restaurant_list,activestop}) {
    //   console.log("check ",activestop)
    const { activestopId ,stop_id_to_restaurant_id} = useCustomer(state => state)
    const navigate = useNavigate();
    const handleClickRestaurant = (id) => {
        navigate(`/restaurant-home/${id}`, { replace: true })
    }
  
    const filteredrestaurantIds = activestopId && stop_id_to_restaurant_id[activestopId];
   
    const filterdrestaurant = !!filteredrestaurantIds && restaurant_list.length > 0 && restaurant_list.filter(item => filteredrestaurantIds.includes(item.id))
  
  return (
        <Box mt='30px'>
            <AlignBox justifyContent='left !important' alignItems='center'>
            <Typography sx={{ fontSize:'18px',fontWeight:'500',color: '#0E0F13' }}>Restaurants at {activestop}</Typography>
            <CustomBadge ml='9px'>{filterdrestaurant && filterdrestaurant.length || 0}</CustomBadge>
            </AlignBox>

            <Box mt='20px'>
               {
                !!filterdrestaurant && filterdrestaurant.length > 0 && filterdrestaurant.map((item,i) => (
                    <Restaurentwrapper sx={{ mb:'15px',backgroundImage: `url(${item.image || images.HEALTH_EATERY})` }} key={i} onClick={() => handleClickRestaurant(item.id)}>
                        <Box sx={{ display:'flex',justifyContent:'right' }}>
                            <img src={item.non_veg_available === true ? images.NON_VEG_ICON : images.VEG_ICON} alt={item.non_veg_available === true ? 'non-veg' : 'veg'} />
                        </Box>
                         <Restaurenttextwrapper>
                            <AlignBox justifyContent='left !important' p='22px'>
                                <SvgIcon style={{ color: '#FEB63B' }}>
                                    <StarIcon />
                                </SvgIcon>
                                <Ratingtext variant="paragraphMedium" sx={{marginLeft:'5.9px',fontFamily:'Poppins' }}>{item.rating}</Ratingtext>
                            </AlignBox>
                            <Box sx={{ backgroundColor:'#fff',p:'18px' }}>
                                <AlignBox>
                                <Placename variant="heading6Medium">{item.trade_name}</Placename>
                                <Typography variant="smallRegular" sx={{ color: '#939497',fontFamily:'Poppins' }}>ETA {item.ETA || '9:30 PM'}</Typography>
                                </AlignBox>
                                <AlignBox justifyContent='left !important' mt="3px">
                                    {/* <SvgIcon style={{ fontSize:'14px' }}>
                                        <CurrencyRupeeIcon />
                                    </SvgIcon> */}
                                    <Typography variant='heading6Semibold' sx={{ color: "#0E0F13",fontSize:'14px',fontWeight:600,fontFamily:'Poppins' }}>₹ {item.amount_estimation} for 1</Typography>
                                </AlignBox>
                                
                                <AlignBox mt='10px' justifyContent='left !important'>
                                    {
                                        item.amenity_list && item?.amenity_list.map((singleitem,j) => (
                                            <AlignBox justifyContent='left' key={j} mr='15px'>
                                                <RedDot></RedDot>
                                                <Typography variant="smallRegular" sx={{ color: "#FD5001",marginLeft:'5px',fontFamily:'Poppins' }}>{singleitem.amenity_name}</Typography>
                                            </AlignBox>
                                        ))
                                    }
                                    {
                                        restaurant_list?.amenity_list?.length >3 && (
                                            <Typography variant="smallRegular" sx={{ color: "#FD5001",fontFamily:'Poppins' }}>+{place.area.length - 3}</Typography>
                                        )
                                    }
                                </AlignBox>
                            </Box>
                         </Restaurenttextwrapper>
                    </Restaurentwrapper>
                ))
               }
            </Box>
        </Box>
  )
}
