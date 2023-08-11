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

function OrderConfirmed({order_status,order_status_heading,order_status_subheading}) {
//console.log("order_status",order_status)
  return (
    <OrderconfirmedBox mx='20px'>
        <OrderconfirmedWrapper>
            <Box height='36px' width='36px'>
              {order_status === 'new' &&
                <img src={images.ORDERCOMPLETELOGO} height='36px' width='36px' alt='order_complete' />
              }
              {order_status === 'prepare' &&
                <img src={images.ORDERPREPARE} height='36px' width='36px' alt='order_complete' />
              }
              {order_status === 'accept' &&
                <img src={images.ORDERPREPARE} height='36px' width='36px' alt='order_complete' />
              }
              {order_status === 'complete' &&
                <img src={images.ORDERPREPARE} height='36px' width='36px' alt='order_complete' />
              }
            </Box>
            <Box>
                <Orderconfirmedheading variant='paragraphMedium'>{order_status_heading}</Orderconfirmedheading>
                <OrderconfirmedDescription variant='smallRegular' mt='5px'>{order_status_subheading}</OrderconfirmedDescription>
            </Box>
        </OrderconfirmedWrapper>
    </OrderconfirmedBox>
  )
}

export default OrderConfirmed