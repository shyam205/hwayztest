import { Box, Typography, styled } from '@mui/material'
import React from 'react'
import images from "@/utilities/images";
console.log("width ",window.innerWidth)
const StyledImage = styled("img")(({ theme }) => ({
  width: '114.123px',
  height: '40px'
}))

const StyledBannersecondImage = styled("img")(({ theme }) => ({
  width: '100%',
  height: '100%',
  // objectFit: window.innerWidth > 480 && 'cover',
  [theme.breakpoints.up('480')]: {
    objectFit: 'cover',
  },
  objectPosition: 'center'
}))

const StyledHeader = styled(Typography)(({ theme }) => ({
  fontSize: '52px !important',
  color: 'black',
  lineHeight: '60px !important',
  fontWeight: '600',
  fontFamily:'poppins'
}))

const StyledDesciption = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: '#939497',
  fontWeight: '400',
  fontFamily:'poppins'
}))

function Bannersecond() {
  return (
    <Box>
        <Box sx={{ height:'100vh'}}>
             <Box sx={{ height:'454.003px',position:'relative'}}>
                <StyledBannersecondImage src={images.Bannersecond} alt='Hwayz' />
                <Box sx={{ position:'absolute',top:'38px',left:'30px' }}>
                <StyledImage src={images.Companylogo} alt='Hwayz' />
                </Box>
             </Box>
             <Box sx={{ paddingLeft:"20px",mt:'51px',lineHeight:'45px' }}>
                <StyledHeader variant="h1" minWidth='40px' width='100%'>
                It’s Hunger time!
                </StyledHeader>
                <StyledDesciption mt='20px'>
                Let’s order delicious food at next stop 
                </StyledDesciption>
             </Box>
        </Box>
    </Box>
  )
}

export default Bannersecond