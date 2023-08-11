import images from '@/utilities/images'
import { Box, Typography } from '@mui/material'
import React from 'react'


const BillDetail = {
        'Itemtotal': '450',
        'Platformfee' :'2.00',
        'GSTcharges': '20.00',
        'totalpay': '472'
    }

function BillDetails({Billdetail,paymentstatus,txn}) {
     //console.log("Billdetail ",Billdetail)
     //console.log("paymentstatus ",paymentstatus)
  return (
    <Box mx='20px' mt='34px' mb='55px'>
        <Box>
            <Typography variant='heading5Medium' sx={{ color: '#0E0F13',fontFamily:'poppins',lineHeight:'150%' }}>
                Bill Details
            </Typography>
            <Box mt='16px' sx={{ padding:'19px 20px 23px 21px',backgroundColor:'#fff',borderRadius:'15px',boxShadow: '0 15px 25px rgb(0 0 0 / 0.05)' }}>
            { Billdetail &&
                
                    <Box>
                        <Box sx={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                        <Box><Typography variant='paragraphRegular' sx={{ color: '#939497',fontFamily: 'Poppins',lineHeight:'150%' }}>Item total</Typography></Box>
                        <Box><Typography variant='heading6Medium' sx={{ color: '#0E0F13',fontFamily: 'Poppins',lineHeight:'150%' }}>₹ {Billdetail.item_total}</Typography></Box>
                        </Box>
                        <Box mt='17px' sx={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                        <Box><Typography variant='paragraphRegular' sx={{ color: '#939497',fontFamily: 'Poppins',lineHeight:'150%' }}>Platform fee</Typography></Box>
                        <Box><Typography variant='heading6Medium' sx={{ color: '#0E0F13',fontFamily: 'Poppins',lineHeight:'150%' }}>₹ {Billdetail.platform_fee}</Typography></Box>
                        </Box>
                        <Box mt='17px' sx={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                        <Box><Typography variant='paragraphRegular' sx={{ color: '#939497',fontFamily: 'Poppins',lineHeight:'150%' }}>GST and restaurant charges</Typography></Box>
                        <Box><Typography variant='heading6Medium' sx={{ color: '#0E0F13',fontFamily: 'Poppins',lineHeight:'150%' }}>₹ {Billdetail.gst_restaurant_charges}</Typography></Box>
                        </Box>
                        {/* <Box mt='21px' sx={{ width:'100%',borderBottom:'1px dashed #939497' }}></Box> */}
                        <img src={images.LINE} alt='line-break' style={{ width:'100%' }} />
                        {paymentstatus === 'pending' && 
                        <Box mt='15px' sx={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                        <Box><Typography variant='paragraphRegular' sx={{ color: '#0E0F13',fontFamily: 'Poppins',lineHeight:'150%' }}>To Pay</Typography></Box>
                        <Box><Typography variant='heading6Medium' sx={{ color: '#0E0F13',fontFamily: 'Poppins',lineHeight:'150%' }}>₹ {Billdetail.payable_amount}</Typography></Box>
                        </Box>
                        }
                        {paymentstatus === 'success' && 
                        <>
                        <Box mt='15px' sx={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                        <Box><Typography variant='paragraphMedium' sx={{ color: '#0E0F13',fontFamily: 'Poppins',lineHeight:'150%' }}>Amount Paid</Typography></Box>
                        <Box><Typography variant='heading6Medium' sx={{ color: '#0E0F13',fontFamily: 'Poppins',lineHeight:'150%' }}>₹ {Billdetail.payable_amount}</Typography></Box>
                        </Box>
                        <img src={images.LINE} alt='line-break' />
                        <Box mt='10px' sx={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                        <Box>
                            <Typography variant='paragraphMedium' sx={{ color: '#0E0F13',fontFamily: 'Poppins',lineHeight:'150%' }}>Payment status </Typography>
                            <Typography variant='paragraphMedium' sx={{ color: '#939497',fontFamily: 'Poppins',lineHeight:'150%' }}>Txn ID: {txn || '43925891258' }</Typography>
                        </Box>
                        <Box><Typography variant='paragraphRegular' sx={{ color: '#04994C',fontFamily: 'Poppins',lineHeight:'150%' }}>Paid</Typography></Box>
                        </Box>
                        </>
                        }
                    </Box>
                
               }
            </Box>
        </Box>
    </Box>
  )
}

export default BillDetails