import { RootContainer } from '@/pages/pages.styles'
import React from 'react'
import { Box, Typography, styled } from "@mui/material";
import OrderdetailHeader from './components/OrderdetailHeader';
import BillDetails from './components/BillDetail';
import OrderItem from './components/OrderItem';
import GoogleMapReact from 'google-map-react'
import { useInfiniteQuery } from "@tanstack/react-query";
import { getOrderdetail } from '@/api/stores';
import useCustomer from '@/state/customer';
import useStoreSelection from '@/state/selection';
import MapSection from './components/MapSection';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const defaultProps = {
    center: {
      lat: 12.9121,
      lng: 77.6446
    },
    zoom: 11
};

const EatryBox = styled(Box)(({ theme }) => ({
  boxShadow: '0px 15px 25px rgba(0, 0, 0, 0.05)',
  backgroundColor: '#fff',
  borderRadius: '15px' 
}))

const EatrytextWrapper = styled(Box)(({ theme }) => ({
  borderRadius: '15px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}))

const EatryText = styled(Typography)(({ theme }) => ({
  fontFamily: 'poppins',
  lineHeight: '150%',
  textTransform: 'capitalize'
}))

const EtaText = styled(Typography)(({ theme }) => ({
  color: '#939497',
  lineHeight: '80%',
  fontFamily: 'poppins',
  textAlign: 'center' 
}))

const EtaTime = styled(Typography)(({ theme }) => ({
  color: '#EF1C26',
  lineHeight: '80%',
  fontFamily: 'poppins',
  textAlign: 'center' 
}))

export default function OrderDetail() {
  const {setCustomerOrderdeatil,customerOrderDetail,create_order,etarestaurant} = useCustomer(state => state);
  const {setItems,setUniquepoid,setCartItems} = useStoreSelection(state => state)
  const { customerId } = useParams();
  //console.log("customerId ",customerId)
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } = useQuery({
    queryKey: [`order-details`],
    queryFn: () => getOrderdetail(customerId),
      onSuccess: (response) => {
        //console.log("responses ",response);
        if( response.status === "success")
         setCustomerOrderdeatil(response?.data)
         setItems([])
         setUniquepoid('')
         setCartItems([])
      },
      refetchInterval: 15000,
      refetchIntervelInBackground: true
  },[])

    //console.log("customerOrderDetail ",customerOrderDetail)

  return (
    <RootContainer>
        <Box sx={{  backgroundColor:'#F9F9F9'}}>
            <OrderdetailHeader 
            orderId={customerOrderDetail?.order_details?.order_number} 
            />
            <EatryBox mt='-131px' mx='20px'>
                    <EatrytextWrapper p='20px'>
                        <Box><EatryText variant='heading6Medium'>{customerOrderDetail?.restaurant_details?.restaurant_details?.details?.registered_name || 'The Healthy Eatery'}</EatryText></Box>
                        <Box>
                            <EtaText variant='paragraphRegular'>ETA</EtaText>
                            <EtaTime mt='8px' variant='heading6Regular'>{etarestaurant}</EtaTime>
                        </Box>
                    </EatrytextWrapper>
                    <Box width="100%" height={180}>
                            <MapSection />
                    </Box>
            </EatryBox>
            {customerOrderDetail?.item_list && customerOrderDetail?.item_list?.length > 0 && <OrderItem orderdItems={customerOrderDetail.item_list} /> }
            {customerOrderDetail && <BillDetails Billdetail={customerOrderDetail.invoice_details} /> }
        </Box>
    </RootContainer>
  )
}

