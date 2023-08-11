import { Box, Typography,SvgIcon, styled,Button } from '@mui/material'
import React, { useState } from 'react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddIcon from '@mui/icons-material/Add';
import { useQuery } from '@tanstack/react-query'
import images from '@/utilities/images';
import { cancelAllorderItem } from '@/api/stores';
import useCustomer from '@/state/customer';
import { useNavigate } from 'react-router-dom';
import routesMapping from '@/routes.mapping';
import { toast } from 'react-toastify';

const Orderitem = [
    {
        name: 'Egg combo',
        quantity: 1,
        amount: 450
    }
]

const CancentOrdertext = styled(Typography)(({ theme }) => ({
    color: '#0E0F13',
    textAlign: 'center',
    fontFamily: 'Poppins',
    linHeight: '150%'
}))

function OrderItem({orderdItems}) {
    const [cancelOrderPopup,setCancelOrderpopup] = useState(false)
    const {restaurantdetail,customerOrderDetail,setCustomerOrderdeatil,setCreateOrder,setCustomerDetails} = useCustomer(state => state)
 
    const {status, data, error, refetch} = useQuery([`cancel-order`],() => cancelAllorderItem({"restaurantId" : restaurantdetail?.id, "orderId" : customerOrderDetail?.order_details?.id}), 
    {
        enabled: false
    });
   
    const navigate = useNavigate()
    const handleCancelOrder = async () => {
        
          refetch()
          setTimeout(() => {
            setCustomerOrderdeatil([])
            setCreateOrder([])
            setCustomerDetails([])
            
            // if(data?.message === "Orders is cancelled successfully." && data.status === 'success'){
            //     toast.success('Orders is cancelled successfully', {
            //         position: "top-center",
            //         autoClose: 2000,
            //         hideProgressBar: false,
            //         closeOnClick: true,
            //         pauseOnHover: true,
            //         draggable: true,
            //         progress: undefined,
            //         theme: "light",
            //         });
            // }
            setTimeout(() => {
                 navigate(`${routesMapping.LANDING}`,{ reload: true })
            },2000)
            
            
          },2000)
          
    }

  return (
    <>
    <Box mx='20px' mt='30px'>
        <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center' }} mt='98px'>
                <Typography variant='heading5Medium' sx={{ color:' #0E0F13',lineHeight:'150%',fontFamily:'poppins' }}>Order Iteams</Typography>
                <Box sx={{display:'flex',justifyContent:'left',alignItems:'center' }}>
                <Typography variant='paragraphRegular' sx={{ color:'#EF1C26',lineHeight:'150%',fontFamily:'poppins'  }} onClick={() => setCancelOrderpopup(true)}>Cancel order</Typography>
                {/* <SvgIcon style={{ heigh:'20px',width:'20px',color:'#EF1C26' }}><ChevronRightIcon /></SvgIcon> */}
                <img src={images.FORWARDARROW} height='20px' width='20px' alt='cancel order' />
                </Box> 
            </Box>
        <Box mt='16px' sx={{ backgroundColor:'#fff',padding:'19px 20px 15px 21px',boxShadow: '0 15px 25px rgb(0 0 0 / 0.05)',borderRadius:'15px' }}>
            <Box sx={{ display:'flex',justifyContent:'left',alignItems:'center'}}>
                <Box sx={{ width:'60%' }}>
                    <Typography variant='smallRegular' sx={{ color:'#939497',fontFamily:'poppins',lineHeight:'150%' }}>Item </Typography>
                </Box>
                <Box sx={{ width:'40%',display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                    <Box><Typography variant='smallRegular' sx={{ color:'#939497',fontFamily:'poppins',lineHeight:'150%' }}>Qty</Typography></Box>
                    <Box><Typography variant='smallRegular' sx={{ color:'#939497',fontFamily:'poppins',lineHeight:'150%' }}>Amount</Typography></Box>
                </Box>
            </Box>
            <Box mt='14px' sx={{ width:'100%',borderBottom:'1px solid rgba(147, 148, 151,0.4)' }}></Box>
            <Box mt='12px'>
                { orderdItems && orderdItems.map((item,i) => (
                    <Box sx={{ display:'flex',justifyContent:'left',alignItems:'center',mb:'10px'}} key={i}>
                    <Box sx={{ width:'60%' }}>
                        <Typography variant='paragraphRegular' sx={{ color:'#939497',fontFamily:'poppins',lineHeight:'150%' }}>{item.menu_item_name}</Typography>
                    </Box>
                    <Box sx={{ width:'40%',display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                        <Box><Typography variant='paragraphMedium' sx={{ color:'#0E0F13',fontFamily:'poppins',lineHeight:'150%' }}>{item.item_quantity}</Typography></Box>
                        <Box><Typography variant='paragraphMedium' sx={{ color:'#0E0F13',fontFamily:'poppins',lineHeight:'150%' }}>₹ {item.payable_amount}</Typography></Box>
                    </Box>
                </Box>
                ))}
            </Box>
            {/* <Box mt='20px'>
                <Box sx={{ display:'flex',justifyContent:'left',alignItems:'center',width:'max-content',mx:'auto',cursor:'pointer' }}>
                    <SvgIcon style={{ color:'#EF1C26',heigh:'15px',width:'15px',marginRight:'3px' }}>
                      <AddIcon />
                    </SvgIcon>
                    <Typography variant='paragraphRegular' sx={{ color:'#EF1C26',fontFamily:'poppins',lineHeight:'150%' }} onClick={() => navigate('/landing')}>
                    Add more items
                    </Typography>
                </Box>
            </Box> */}
        </Box>
            
    </Box>
    {
                cancelOrderPopup && data?.message !== 'Orders is cancelled successfully.' && data?.status !== 'success' && (
                    <Box sx={{ position:'fixed',top:'0',left:'0',height:'100vh',width:'100%',background: 'rgba(0, 0, 0, 0.80)',display:'flex',justifyContent:'center',alignItems:'center' }}>
                    <Box mx='20px' sx={{ backgroundColor:'#fff',padding:'50px 28px 49px 28px',borderRadius:'15px' }}>
                        <Box sx={{ display:'flex',justifyContent:'center' }}>
                            <img src={images.CANCEL_ORDER} height='99px' width='96px' alt='cancel_order' />
                        </Box>
                        <CancentOrdertext mt='20px' variant='heading5Semibold'>
                        Are you sure you want to cancel the order?
                        </CancentOrdertext>
                        <Box mt='27px' sx={{ display:'flex',justifyContent:'space-between',alignItems:'center',columnGap:'20px',boxSizing:'border-box' }}>
                            <Button variant='heading6Medium' sx={{ width:'130px',padding:'12px 54px',fontSize:'16px',lineHeight:'150%',color:'#0E0F13',border:'1px solid #939497',borderRadius:'50px',fontFamily:'poppins' }} onClick={() => setCancelOrderpopup(false)}>No</Button>
                            <Button variant='heading6Medium' sx={{ width:'130px',padding:'12px 54px',fontSize:'16px',lineHeight:'150%',borderRadius:'50px',fontFamily:'poppins',background: 'linear-gradient(159deg, #FD5001 0%, #EF1C26 100%)',color:'#fff' }} onClick={handleCancelOrder}>Yes</Button>
                        </Box>
                    </Box>
                    </Box>
                )
            }
    </>
  )
}

export default OrderItem