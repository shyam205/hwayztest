import { Box, Typography,styled } from '@mui/material'
import React from 'react'
import images from '@/utilities/images';

const OrderconfirmedBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff', 
  padding: '18px 17.85px 18px 17.85px',
  borderRadius: '15px'
}))

const OrderconfirmedWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'left',
  alignItems: 'center',
  columnGap: '15.15px'
}))

const Orderconfirmedheading = styled(Typography)(({ theme }) => ({
  textTransform: 'capitalize',
  color: '#0E0F13',
  fontFamily: 'poppins',
  lineHeight: '150%'
}))

const OrderconfirmedDescription = styled(Typography)(({ theme }) => ({
  color: '#939497',
  fontFamily:'poppins',
  lineHeight: '150% '
}))

function OrderConfirmed() {
  return (
    <OrderconfirmedBox mx='20px'>
        <OrderconfirmedWrapper>
            <Box height='36px' width='36px'>
                <img src={images.ORDERCOMPLETELOGO} height='36px' width='36px' alt='order_complete' />
            </Box>
            <Box>
                <Orderconfirmedheading variant='paragraphMedium'>Order confirmed by restuarnt !</Orderconfirmedheading>
                <OrderconfirmedDescription variant='smallRegular' mt='5px'>Save another Rs. 70 on this order</OrderconfirmedDescription>
            </Box>
        </OrderconfirmedWrapper>
    </OrderconfirmedBox>
  )
}

export default OrderConfirmed