import React, { useEffect } from 'react'
import { useQuery,useMutation } from "@tanstack/react-query";
import { getInfoPayment } from '@/api/stores';
import { CircularProgress } from '@mui/material';
import { Box, styled } from '@mui/material'
import useCustomer from '@/state/customer';
import { useNavigate } from 'react-router-dom';

function Paymentresponse() {
    const { customerOrderDetail,updatecart,customerdetail,create_order,setPaymentRedirect} = useCustomer(state => state)
    //console.log("create_order ",create_order)
    const navigate = useNavigate();
    // const { isLoading, error, data } = useQuery({
    //     queryKey: ['payment-info'],
    //     queryFn: () => getInfoPayment(
    //         create_order?.order_details?.order_number,
    //         create_order?.invoice_details?.payable_amount,
    //         customerdetail?.customer_details?.id,
    //         customerdetail?.customer_details?.customer_mobile_no,
    //         customerdetail?.customer_details?.customer_name.split(' ')[0],
    //         customerdetail?.customer_details?.customer_name.split(' ')[1]
    //         ),
    //     onSuccess: (response) => {
    //         console.log("response ",response)
    //         // setPaymentRedirect(response)
    //         //  navigate(`${response.data.payment_links.web}`)
    //     }
    //   })

    const { mutate:paymentinformation, mutateAsync, isLoading, isError, error } = useMutation(getInfoPayment,{
        
        onSuccess: (response) => {
            //console.log("response ",response)
                    setPaymentRedirect(response)
                    if(response?.data?.payment_links?.web){
                        console.log("qwqwq",response?.data?.payment_links?.web)
                        window.location.href = `${response?.data?.payment_links?.web}`
                        // navigate(`${response?.data?.payment_links?.web}`,{ replace: true })
                    }
                     
          },
          onError:(error) => {
            console.log("error",error)
          }
    });

     const paymentdetailrequest = () => {
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
        paymentdetailrequest()
    },[])
    
      if (isLoading) return (
        <Box sx={{ height:'100vh',width:'100%',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#fff' }}>
        <CircularProgress />
        </Box>
      )
      if(error) return (
        <Box sx={{ height:'100vh',width:'100%',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#fff' }}>
          <Typography>error...</Typography>
        </Box>
      )


  return (
    <Box sx={{ backgroundColor:'#fff' }}>
        
    </Box>
  )
}

export default Paymentresponse