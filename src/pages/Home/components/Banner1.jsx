import { Box, styled } from '@mui/material'
import React from 'react'
import images from "@/utilities/images";

const StyledImage = styled("img")(({ theme }) => ({
  width: 185.45,
  height: 65,
}))

const StyledBannerfirstImage = styled("img")(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center'
}))

const StyledLogoContainer = styled("div")(({ theme }) => ({
  position: 'absolute',
  top: '0',
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}))

function Bannerfirst() {

  return (
    <Box sx={{ position:'relative' }}>
       <Box sx={{ height:'100vh'}}>
          <StyledBannerfirstImage src={images.Bannerfirst} alt='Hwayz' />
       </Box>
       <StyledLogoContainer>
       <StyledImage src={images.Companylogo} alt='Hwayz' />
       </StyledLogoContainer>
    </Box>
  )
}

export default Bannerfirst