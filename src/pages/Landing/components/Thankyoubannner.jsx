import React from 'react'
import { Box, Typography } from "@mui/material";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { styled } from '@mui/material/styles'
import { useState } from "react";
import images from "@/utilities/images";
import { SvgIcon } from '@mui/material';

const Thankyoucontainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    boxSizing: 'border-box',
    boxShadow: '0 15px 25px rgba(0, 0, 0, 0.05)',
    borderRadius: '15px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',  
    backgroundPosition: 'top'
  }))

  const Thankyouwrapper = styled(Box)(({ theme }) => ({
    padding: '15px 17px 19px 53px'
  }))

  const Thankyoutext = styled(Typography)(({ theme }) => ({
    fontSize: '18px',
    lineHeight: '27px',
    fontWeight: 600,
    fontFamily: 'Poppins'
  }))

  const Traveltext = styled(Typography)(({ theme }) => ({
    color:'#939497', 
    fontFamily: 'Poppins'
  }))

export default function Thankyoubannner({tradename}) {
    const [thankyou,setThankyou] = useState('true')
    // console.log("tradename ",tradename)
  return (
    <Box>
         { thankyou && (
            <Thankyoucontainer sx={{ backgroundImage:`url(${images.THANKYOUBANNER})`,mt:'30px' }}>
                <Thankyouwrapper>
                    <Box>
                     <Box sx={{ display:'flex',alignItems:'center' }}>
                      <Thankyoutext mr={2}>Thank you!</Thankyoutext>
                      <img src={images.EMOJI} alt='emoji' />
                     </Box>
                     <Box sx={{  display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                     <Traveltext variant='paragraphRegular' sx={{ lineHeight:'21px' }}>For traveling with us</Traveltext>
                     <Traveltext variant='smallRegular' sx={{ lineHeight:'18px' }}>{tradename || '~Team VRL'}</Traveltext>
                     </Box>
                    </Box>
                    <Box sx={{ position:'absolute',right:'20px',top:'10px' }} onClick={() => setThankyou(false)}>
                        <SvgIcon style={{ color:"#939497",cursor:'pointer',height:'12px',width:'12px' }}><CloseOutlinedIcon /></SvgIcon>
                    </Box>
                    <Box>

                    </Box>
                </Thankyouwrapper>
            </Thankyoucontainer>
            )}
    </Box>
  )
}

