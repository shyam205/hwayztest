import React from 'react'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, IconButton, SvgIcon, Typography, styled } from '@mui/material';
import images from '@/utilities/images';
import OrderConfirmed from './OrderConfirmed';
import { useNavigate } from 'react-router-dom';

const EateryWrapper = styled(Box)(({ theme }) => ({
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    borderBottomLeftRadius: '25px',
    borderBottomRightRadius: '25px'
}))

const HeaderWrapper = styled(Typography)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: '8px',
    marginRight: '20px',
    paddingTop: '20px',
    paddingBottom: '19px'
}))

const Ordernumber = styled(Typography)(({ theme }) => ({
    color: '#0E0F13',
    fontFamily: 'poppins',
    lineHeight: '144%'
}))

const Help = styled(Typography)(({ theme }) => ({
    color: '#0E0F13',
    cursor: 'pointer',
    fontFamily: 'poppins'
}))

function OrderdetailHeader({orderId,restaurantdeatils}) {
    const navigate = useNavigate()
  return (
    <Box>
        <EateryWrapper sx={{ backgroundImage:`url(${images.EATERYBACKGROUND})`, pb:'20px',height:'271px'}}>
            <HeaderWrapper>
                <Box sx={{ display:'flex',justifyContent:'left',alignItems:'center' }}>
                <Box height='32px' width='32px'>
                    {/* <img src={images.BACKARROW} alt='back' /> */}
                </Box>
                <Ordernumber variant='heading6Medium'>Order {orderId}</Ordernumber>
                </Box>
                <Box>
                    <Box sx={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                    <IconButton sx={{ p:0,backgroundColor:'transparent' }} onClick={() => navigate('/faq')}>
                        <img src={images.INFOICON} alt='info' />
                        <Help variant='smallRegular' ml='6px'>Help</Help>
                    </IconButton>
                    </Box>
                </Box>
            </HeaderWrapper>
           <OrderConfirmed />
        </EateryWrapper>
    </Box>
  )
}

export default OrderdetailHeader