import React, { useEffect, useState } from 'react'
import images from '@/utilities/images';
import { Box, SvgIcon, Typography, styled,Button } from '@mui/material';
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { createOrder, getInfoPayment, getOrderDetail } from '@/api/stores';
import { useNavigate } from 'react-router-dom';
import useCustomer from '@/state/customer';
import useStoreSelection from '@/state/selection';
import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useRoutes } from "react-router-dom";
import { useLocation } from 'react-router-dom'


const PaymentSuccessText = styled(Typography)(({ theme }) => ({
    color:'#0E0F13',
    lineHeight:'144%',
    fontFamily: 'Poppins',
    fontWeight: 600
}))

const SuccessImage = styled("img")(({ theme }) => ({
transform: 'translateX(-12px)'
}))

const PaymentCount = styled(Typography)(({ theme }) => ({
    color: '#EF1C26',
    texAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: '36px',
    fontWeight: 600,
    lineHeight: '150%',
    textAlign: 'center'
})) 

const FlexSucess = styled(Typography)(({ theme }) => ({
    display: 'flex',
    position: 'relative',
    zIndex: 55,
    boxShadow:'0 15px 25px rgb(0 0 0 / 0.05)',
    borderRadius:'15px',
    backgroundColor:'#fff',
    textAlign:'center'
}))

const MakePaymentButton = styled(Button)(({ theme }) => ({
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '150%',
    padding: '12px',
    backgroundImage: 'linear-gradient(to right,#FD5001,#EF1C26)',
    color: '#FFF',
    width: '100%',
    borderRadius: '25px',
    marginTop: '25px',
    fontFamily:'poppins' 
}))

export default function Paymentstatus() {
    const [loading,setLoading] = useState(true)
    const [paymentsuccess,setPaymentsuccess] = useState(true)
    const [paymentcomplete,setPaymentcomplete] = useState(false)
    const {setCreateOrder,create_order,primary_route_id,vehicle_id,travel_partner_id,customerdetail,updatecart,setPaymentRedirect} = useCustomer(state => state)
    const {unique_poid,items} = useStoreSelection(state => state)
    const params = useParams()
    const navigate = useNavigate();
    const search = useLocation()
    // console.log("search",search)
  
   
    // const { mutate:createOrdermutaion, isLoading, isError, error } = useMutation(createOrder, {
    //     onSuccess: (response) => {
    //        //console.log('responses', response);
    //       if (response.message === 'Order is created successfully.' && response.status === 'success') {
    //         setCreateOrder(response.data)
    //         setTimeout(() => {
    //             navigate(`/order-detail`, { replace: true })
    //         },1000)
            
    //       }
    //     },
    //   });


    //console.log("customerDetail ",customerDetail)
    // const orderCreationfun = () => {
      
    //     let data = {
    //       body: JSON.stringify({
    //         "supply_id": items[0]?.id,
    //         "vehicle_id": vehicle_id,
    //         "route_id": primary_route_id,
    //         "po_id": unique_poid,
    //         "customer_id": customerdetail?.customer_details?.id,
    //         "travel_partner_id": travel_partner_id
    //       }),
    //       redirect: 'follow',
    //   }
    //   createOrdermutaion(data)
    //   }

    
    //   useEffect(() => {
    //         orderCreationfun()
    //   },[])

    const { mutate:paymentinformation, mutateAsync, isLoading, isError, error } = useMutation(getInfoPayment,{
        
        onSuccess: (response) => {
            //console.log("response1 ",response)
                    setPaymentRedirect(response)
                    if(response?.data?.payment_links?.web){
                        console.log("qwqwq",response?.data?.payment_links?.web)
                        window.location.href = `${response?.data?.payment_links?.web}`
                        // navigate(`${response?.data?.payment_links?.web}`,{ replace: true })
                    }
                     
          },
    });

    const handleMakePayment = () => {
        
        let data = {
            body: JSON.stringify({

                "order_id": `${create_order?.order_details?.order_number}`,
                // "amount": `${create_order?.invoice_details?.payable_amount}`,
                "amount": `1`,
                'customer_id': `${customerdetail?.customer_details?.id}`,
                "customer_phone": `${customerdetail?.customer_details?.customer_mobile_no}`,
                'first_name':  `${customerdetail?.customer_details?.customer_name.split(' ')[0]}`,
                'last_name':  `${customerdetail?.customer_details?.customer_name.split(' ').slice(1).join(' ')}`
            }),
            redirect: 'follow',
        }
        paymentinformation(data)
    }
    useEffect(() => {
         if(search.search.includes('status=CHARGED')){
        setPaymentsuccess(true)
        setLoading(false)
        navigate(`/order-detail/${create_order?.order_details?.order_number}`, { replace: true })
    }
    else{
        setPaymentsuccess(false) 
        setLoading(false)
    }
    })
  return (
    <FlexSucess mx='20px' mt='-166px'>
        {loading ?  
        <Box sx={{ position:'fixed',top:0,left:0,height:'100vh',width:'100%',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#fff' }}>
        <CircularProgress />
        </Box>
        :
        <>
        {paymentsuccess && 
                <Box sx={{ padding:'81px 61px 63px 60px',width:'100%' }}>
                    <Box sx={{ textAlign:'center' }}>
                        <SuccessImage src={images.SUCCESSPAYMENT} height='155.734px' width='178.39px' alt='success_payment' />
                    </Box>
                    <PaymentSuccessText mt='16.27px' variant='heading5Semibold'>
                    Payment successful
                    </PaymentSuccessText>
                    <PaymentCount mt='14px'>
                    ₹ {create_order?.invoice_details?.payable_amount || ''}
                    </PaymentCount>
                </Box>
                }
                {!paymentsuccess && 
                <Box sx={{ padding:'41px 23px 46px 23px',width:'100%' }}>
                    <Box sx={{ textAlign:'center' }}>
                        <SuccessImage src={images.FAILEDPAYMENT} height='155.734px' width='178.39px' alt='success_payment' />
                    </Box>
                    <PaymentSuccessText mt='16.27px' variant='heading5Semibold'>
                    Payment failed
                    </PaymentSuccessText>
                    <Typography mt='8px' variant='paragraphRegular' sx={{ lineHeight:'150%',fontFamily:'poppins',color:'#939497' }}>
                    Your transaction has failed due  to some error please try agin
                    </Typography>
                    <PaymentCount mt='21px'>
                    {updatecart?.invoice_details?.payable_amount?.formatMoney?.()} 
                    </PaymentCount>
                    <MakePaymentButton variant='heading6Medium' color='#fff' sx={{ maxWidth:'245px' ,cursor:'pointer'}} onClick={handleMakePayment}>
                    Make Payment
                    </MakePaymentButton>
                </Box>
                }
        </>
        }
       
    </FlexSucess>
  )
}

