import React from 'react'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, IconButton, SvgIcon, Typography, styled } from '@mui/material';
import images from '@/utilities/images';
import OrderConfirmed from './OrderConfirmed';
import { useNavigate } from 'react-router-dom';
import routesMapping from '@/routes.mapping';

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

function OrderdetailHeader({orderId,order_status,order_status_heading,order_status_subheading}) {
    const navigate = useNavigate()
  return (
    <Box>
        <EateryWrapper sx={{ backgroundImage:`url(${images.EATERYBACKGROUND})`, pb:'20px',height:'271px'}}>
            <HeaderWrapper>
                <Box sx={{ display:'flex',justifyContent:'left',alignItems:'center' }}>
                <Box height='32px' width='32px'>
                    <IconButton sx={{ p:0 }} onClick={() => navigate(`${routesMapping.LANDING}`)}>
                        <img src={images.BACKARROW} alt='back' />
                    </IconButton>
                </Box>
                <Ordernumber variant='heading6Medium'>Order {orderId}</Ordernumber>
                </Box>
                <Box>
                    <Box sx={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                        <IconButton sx={{ p:0 }} onClick={() => navigate('/faq')}>
                        {/* <img src={images.INFOICON} alt='info' /> */}
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10.0002" cy="6.0002" r="0.8" fill="#0E0F13"/>
                        <path d="M9.2 8.4H10V14M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z" stroke="#0E0F13" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <Help variant='smallRegular' ml='6px'>Help</Help>
                        </IconButton>
                    </Box>
                </Box>
            </HeaderWrapper>
           <OrderConfirmed order_status={order_status} order_status_heading={order_status_heading}
            order_status_subheading={order_status_subheading} />
        </EateryWrapper>
    </Box>
  )
}

export default OrderdetailHeader