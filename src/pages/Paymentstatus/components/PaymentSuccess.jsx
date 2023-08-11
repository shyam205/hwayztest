import React from 'react'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, IconButton, SvgIcon, Typography, styled } from '@mui/material';
import images from '@/utilities/images';
import PaymentStatus from './PaymentStatus';
import { useNavigate } from 'react-router-dom';

const EateryWrapper = styled(Box)(({ theme }) => ({
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    borderBottomLeftRadius: '25px',
    borderBottomRightRadius: '25px'
}))

export default function PaymentSuccess() {

    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/faq')
    }

  return (
    <Box> 
        <EateryWrapper sx={{ backgroundImage:`url(${images.EATERYBACKGROUND})`, pb:'20px',height:'227px'}}>
        <Box sx={{ display:'flex',justifyContent:'space-between',alignItems:'center',ml:'8px',mr:'20px',pt:'20px',pb:'28px' }}>
            <Box height='32px' width='32px'>
               <IconButton onClick={() => navigate(-1)} sx={{ padding:0 }}><img src={images.BACKARROW} height='32px' width='32px' alt='back' /></IconButton>
            </Box>
            <Box>
                <Box sx={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                <IconButton sx={{ padding:0 }} onClick={handleClick}>
                <img src={images.INFOICON} alt='info' />
                <Typography variant='smallRegular' ml='6px' sx={{ color:'#0E0F13',cursor:'pointer',fontFamily:'poppins',lineHeight:'20px' }}>Help</Typography>
                </IconButton>
                </Box>
            </Box>
        </Box>
        
        </EateryWrapper>
        <PaymentStatus />
    </Box>
  )
}

