import React from 'react'
import { Box, Typography } from "@mui/material";
import { styled } from '@mui/material/styles'
import images from "@/utilities/images";


const Thankyoucontainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    boxSizing: 'border-box',
    borderRadius: '15px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',  
    backgroundPosition: 'center'
  }))

  const Prebookwrapper = styled(Box)(({ theme }) => ({
    position: 'relative',
    padding: '24px 26px',
    maxWidth: '201px'  
  }))

  const PrebookText = styled(Typography)(({ theme }) => ({
    display: 'inline-block',
    fontWeight: 700,
    color: '#832901',
    fontSize: '14px',
    lineHeight: '21px',
    fontFamily:'poppins !important'
  })) 

export default function Prebookmeal() {
  return (
    <Box>
            <Thankyoucontainer sx={{ position:'relative',mt:'30px',backgroundImage:`url(${images.PREBOOKMEAL})` }}>
                <Prebookwrapper>
                    <Typography sx={{ color:'#832901',fontSize:'14px',lineHeight:'21px',fontWeight:'400' }}>
                        <PrebookText variant="span" sx={{ fontFamily:'poppins !important' }}>
                            Pre book
                        </PrebookText> your meals now to have a delightful journey.</Typography>
                </Prebookwrapper>
            </Thankyoucontainer>
    </Box>
  )
}

 