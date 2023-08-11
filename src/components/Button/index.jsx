import React from 'react';
import { Button } from '@mui/material';

const CustomButton = ({ text,status, onClick }) => {
    const gradientStyle = {
        background: status ? 'linear-gradient(to right,#FD5001,#EF1C26)' : 'rgba(147, 148, 151, 0.30)',
        border: 0,
        borderRadius: '50px',
        boxShadow: status && '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: status ? 'white' : '#939497',
        fontWeight: '500',
        padding: '15px 30px !important',
        width: '100%',
        fontFamily: 'poppins'
      };
  return (
    <Button sx={gradientStyle} onClick={onClick}>
      {text}
    </Button>
  );
};

export default CustomButton;