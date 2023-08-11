import React, { useEffect, useState } from 'react'
import { Box, SvgIcon, Typography, styled,FormControl, FormLabel,TextField, Button, Stack, IconButton } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import images from '@/utilities/images';
import Checkbox from '@mui/material/Checkbox';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import useCustomer from '@/state/customer';
import { createOrder, createuser, getOtpforCustomer, userOtpVerification } from '@/api/stores';
import { SuccessToast } from '@/components/Tostify';
import { ErrorToast } from '@/components/Tostify';
import route from '../../routes.mapping'
import OtpInput from 'react-otp-input';
import { toast } from 'react-toastify';
import useStoreSelection from '@/state/selection';
import CircularProgress from '@mui/material/CircularProgress';

const EateryWrapper = styled(Box)(({ theme }) => ({
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    borderBottomLeftRadius: '25px',
    borderBottomRightRadius: '25px'
}))

const Popupbox = styled(Box)(({ theme }) => ({
    height:'100vh',
    width:'100%',
    position:'fixed',
    top:0,
    left:0,
    backgroundColor: 'rgba(0, 0, 0, 0.80)',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
}))

const HeaderWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: '8px',
    marginRight: '20px',
    paddingTop: '20px',
    paddingBottom: '29px' 
}))

const HelpText = styled(Typography)(({ theme }) => ({
    color: '#0E0F13',
    cursor: 'pointer',
    fontFamily: 'poppins',
    lineHeight: '20px'
}))

const Detaildesc = styled(Typography)(({ theme }) => ({
    color: '#939497', 
    marginTop: '5px', 
    lineHeight: '144%', 
    fontFamily: 'poppins'
}))

const Termscondition = styled(Typography)(({ theme }) => ({
    color: '#939497', 
    marginLeft: '12px', 
    fontFamily: 'poppins', 
    lineHeight: '150%'
}))

const ReceiveNotification = styled(Typography)(({ theme }) => ({
    color: '#939497',
    marginLeft: '12px', 
    fontFamily: 'poppins', 
    lineHeight: '150%'
}))

const Continuebutton = styled(Button)(({ theme }) => ({
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '150%',
    padding: '12px',
    width: '100%',
    borderRadius: '25px'
}))

const ValidOTP = styled(Typography)(({ theme }) => ({
    color: '#0E0F13', 
    lineHeight: '144%', 
    marginTop: '21px', 
    fontFamily: 'poppins', 
    textAlign: 'center'
})) 

const WhatsappNumber = styled(Typography)(({ theme }) => ({
    color: '#EF1C26',
    display: 'inline-block', 
    marginLeft: '5px', 
    fontFamily: 'poppins'
})) 

const Didnotrecieve = styled(Typography)(({ theme }) => ({
    color: '#939497', 
    lineHeight: '150%', 
    marginTop: '16px', 
    fontFamily: 'poppins'
}))

const VerifytextButton = styled(Button)(({ theme }) => ({
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '150%',
    padding: '12px',
    width: '100%',
    borderRadius: '25px',
    marginTop: '25px',
    fontFamily:'poppins' 
}))

const NameTextfield = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        'input':{
            ':-moz-placeholder':{
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '144%',
            fontfamily: 'Poppins'
            },
            ':-ms-input-placeholder':{
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '144%',
                fontfamily: 'Poppins'
            },
            '::-webkit-input-placeholder':{
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '144%',
                fontfamily: 'Poppins'
            }
         },
        
        '& fieldset': {
          borderColor: 'rgba(147, 148, 151, 0.50)',
          borderRadius:'30px',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'rgba(147, 148, 151, 0.50) !important',
          },
          paddingLeft:'30px !important' 
    }
}))

const WhatsappTextfield = styled(TextField)(({ theme }) => ({ 
    '& .MuiOutlinedInput-root': {
                        
        'input':{
           ':-moz-placeholder':{
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '144%',
            fontfamily: 'Poppins'
           },
           ':-ms-input-placeholder':{
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '144%',
            fontfamily: 'Poppins'
           },
           '::-webkit-input-placeholder':{
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '144%',
            fontfamily: 'Poppins'
           }
        },
        '& fieldset': {
          borderColor: 'rgba(147, 148, 151, 0.50)',
          borderRadius:'30px',
          px:'30px',
          fontSize: '14px !important',
          fontWeight: 400,
          lineHeight: '144%'
        },
        '&.Mui-focused fieldset': {
            borderColor: 'rgba(147, 148, 151, 0.50) !important',
          },
          paddingLeft:'30px !important' 
    }

}))

const OtpTextfield = styled(TextField)(({ theme }) => ({ 
    width:'60%',
    '& .MuiOutlinedInput-root': {
        'input':{
            paddingLeft:0,
            paddingRight:0,
            paddingTop:0,
            paddingBottom:'8px',
            textAlign:'center',
            height:'19px'
        },
        '& fieldset': {
          borderRadius:'0px !important',
          borderLeft: '#fff !important',
          borderRight: '#fff !important',
          borderTop: '#fff !important'
        },
        '&.Mui-focused fieldset': {
            borderBottom: '1px solid #EF1C26', 
          },

    }
}))

function UserInfo() {
    const { customerName,whatsappNo,setCustomerDetails,customerdetail,setCreateOrder,primary_route_id,vehicle_id,travel_partner_id} = useCustomer(state => state)
    const { unique_poid,items } = useStoreSelection(state => state)
    const [username, setUsername] = useState('');
    const [whatsappnumber, setWhatsappnumber] = useState('');
    const [whatsappconsent,setWhatsappconsent] = useState(true);
    const [tncconsent,setTncconsent] = useState(true);
    const [otppopup,setOtppopup] = useState(false)
    const [otpvalidate,setOtpvalidate] = useState(false)
    const [disablebutton,setDisablebuton] = useState(true)
    const [notp, setNotp] = useState('');
    const [time, setTime] = useState(30);
    const [timerRunning, setTimerRunning] = useState(false);
    const [showtimer,setShowtimer] = useState(false)
    const [disableloader,setDisableloader] = useState(false)
    const [disableloaderotp,setDisableloadertotp] = useState(false)

    const { mutate:createUser, isLoading, isError, error } = useMutation(createuser,{
        onSuccess: (response) => {
            //console.log("response ",response)
            if(response.status === 'success'){
            setCustomerDetails(response?.data)
            setTimeout(() => {
                setTimerRunning(true)
                setShowtimer(true)
                setDisableloader(false)
                setOtppopup(true)
                // getOtp()
            },2000)
            SuccessToast('OTP sent successfully')
          }
          
           return;
          },
          onError: (error) => {
            ErrorToast('Something went wrong')
            setTimeout(() => {
                setDisableloader(false)
            },3000)
            
          },
    });
    const navigate = useNavigate();
    // const { mutate:getCustomerOtp } = useMutation(getOtpforCustomer,{
    //     onSuccess: (response) => {
    //         if(response.status === 'success'){
    //                 SuccessToast('OTP sent successfully')
    //                 setOtppopup(true) 
    //                 setDisableloadertotp(false)
    //         }
    //        return;
    //       },
    //       onError: (error) => {
    //         ErrorToast('Something went wrong')
    //         setDisableloadertotp(false)
    //       },
    // });

    const { mutate:verifiOtp } = useMutation(userOtpVerification,{
        onSuccess: (response) => {
            if(response.status === 'success'){
                // SuccessToast('Customer mobile is verified successfully')
                toast.success('Customer mobile is verified successfully', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                setOtpvalidate(true)
                orderCreationfun()
                // setTimeout(() => {
                //     navigate(`${route.PAYMENT_OPTIONS}`, { replace: true })
                // },3000)
            }
           return;
          },
          onError: (error) => {
            ErrorToast('Something went wrong')
          },
    });

    const { mutate:createOrdermutaion } = useMutation(createOrder, {
        onSuccess: (response) => {
           //console.log('responses', response);
          if (response.status === 'success') {
            setCreateOrder(response.data)
            setTimeout(() => {
                navigate(`/payment-detail`, { replace: true })
                // navigate(`/order-detail/${response.data?.order_details?.order_number}`, { replace: true })
            },2000)
            
          }
        },
      });

    const [otp, setOtp] = useState(['', '', '', '']);

    const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleWhatsAppconcent = (e) => {
    setWhatsappconsent(e.target.checked ? true : false);
  }

  const handleTncConcent = (e) => {
    setTncconsent(e.target.checked ? true : false);
  }

  const getOtp = () => {
    let data = {
        body: JSON.stringify({
            "customer_name": username,
            "customer_mobile_no": whatsappnumber,
            "customer_whats_app_consent": whatsappconsent,
            "customer_tnc_consent": tncconsent,
        }),
        redirect: 'follow',
        "customerId": customerdetail?.customer_details?.id
    }
    getCustomerOtp(data)
  }


//   const handleKeyDown = (index, e) => {
//     if (e.key === 'Backspace' && otp[index] === '') {
//       // Move focus to previous input box when backspace is pressed and current box is empty
//       if (index > 0) {
//         const previousInput = document.getElementById(`otp-input-${index - 1}`);
//         previousInput.focus();
//       }
//     }
//   };

   const handlePopup = (e) => {
    e.preventDefault();
    let checkuservalue = username.trim().indexOf(' ') != -1
    if(checkuservalue === false){
        ErrorToast('Please Enter your Full Name')
        return null;
    }
    let data = {
        body: JSON.stringify({
            "customer_name": username,
            "customer_mobile_no": whatsappnumber,
            "customer_whats_app_consent": whatsappconsent,
            "customer_tnc_consent": tncconsent
        }),
        redirect: 'follow',
    }
    createUser(data)
    setOtppopup(false)
    setDisableloader(true)
    
   }
 
   const handleSubmitotp = () => {
    
    let data = {
        body: JSON.stringify({
            "customer_id": customerdetail?.customer_details?.id,
            "otp_str": notp,
            "po_id": unique_poid
        }),
        redirect: 'follow',
        customer_id: 1,
    }
    verifiOtp(data)
    setDisableloadertotp(true)
    setOtpvalidate(false)
   }
   
   const handleChangeWhatsappnumber = (e) => {

    let x = e.target.value[e.target.value.length -1]
    // console.log(e.target.value)
    // console.log(isNaN(x))
    if(e.target.value.length === 0){
        setWhatsappnumber('')
    }
    if(isNaN(x) === false){
        setWhatsappnumber(e.target.value)
    }
    
   }

   const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if(`${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}` === '00:00'){
       
        setTimeout(() => {
        setTimerRunning(false)
        setShowtimer(false)
        },0)
        setTime(30)
    }
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStartTimer = () => {
    getOtp()
   
    if (!timerRunning) {
        setShowtimer(true)
      setTimerRunning(true);
      
    }
  };

  const orderCreationfun = () => {
      
    let data = {
      body: JSON.stringify({
        "supply_id": items[0]?.id,
        "vehicle_id": vehicle_id,
        "route_id": primary_route_id,
        "po_id": unique_poid,
        "customer_id": customerdetail?.customer_details?.id,
        "travel_partner_id": travel_partner_id
      }),
      redirect: 'follow',
  }
  createOrdermutaion(data)
  }

   useEffect(() => {
    if(username.length > 0 && whatsappnumber.length===10 && !!whatsappconsent && !!tncconsent){
        setDisablebuton(false)
      }
      else{
        setDisablebuton(true)
      }
   },[username,whatsappnumber,whatsappconsent,tncconsent])

   useEffect(() => {
    let timer;
    if (timerRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    }else{
        // setTimerRunning(prev => !prev);
        // setShowtimer(true);
    }

    return () => clearInterval(timer);
  }, [timerRunning]);

  
 
  return (
    <Box sx={{ backgroundColor:'#fff' }}>
        <EateryWrapper sx={{ backgroundImage:`url(${images.EATERYBACKGROUND})`}}>
        <HeaderWrapper>
            <Box>
               <IconButton onClick={() => navigate(-1)} sx={{ p:0,cursor:'pointer' }}><img src={images.BACKARROW} alt='back' /></IconButton>
            </Box>
            <Box>
                <Box sx={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                    <IconButton sx={{ padding:0 }} onClick={() => navigate('/faq', { replace: true })}>
                    {/* <img src={images.INFOICON} alt='info' /> */}
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10.0002" cy="6.0002" r="0.8" fill="#0E0F13"/>
                    <path d="M9.2 8.4H10V14M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z" stroke="#0E0F13" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <HelpText variant='smallRegular' ml='6px'>Help</HelpText>
                    </IconButton>
                </Box>
            </Box>
        </HeaderWrapper>
     
        </EateryWrapper>
        <Box>
        <Stack flexDirection='column' justifyContent='space-between' sx={{ height:'90vh' }}>
        <Box px='20px' mt='60px'>
            <Typography variant='heading5Medium' sx={{ color:'#0E0F13',lineHeight:'144%',fontFamily:'poppins' }}>
                Enter a Details
            </Typography>
            <Detaildesc variant='paragraphRegular'>Enter a details to make a payment successfully</Detaildesc>

            <Box mt='30px' sx={{ boxSizing:'border-box' }}>
                <Box sx={{ overflow:'hidden' }}>
                <NameTextfield 
                fullWidth 
                placeholder='Enter full name' 
                id="fullWidth"
                px='30px !important'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                </Box>
                <Box mt='20px' sx={{ overflow:'hidden' }}>
                <WhatsappTextfield 
                type='text'
                className='abc'
                fullWidth 
                placeholder='Enter your whatsapp number' 
                id="fullWidth" 
                fontSize='14px !important'
                value={whatsappnumber}
                onChange={handleChangeWhatsappnumber}
                inputProps={{ inputMode: 'numeric',maxLength: 10 }}
                 />
                </Box>
                <Stack flexDirection='row' alignItems='center' justifyContent='left' mt='15px'>
                    <Checkbox sx={{ height:'20px',width:'20px'}} style={{ color:'rgba(147, 148, 151, 0.50)'}} defaultChecked onChange={handleTncConcent} />
                    <Termscondition variant='smallRegular'>I agree to Terms & Condition and Privacy Policy</Termscondition>
                </Stack>
                <Stack flexDirection='row' alignItems='center' justifyContent='left' mt='10px'>
                    <Checkbox sx={{ height:'20px',width:'20px' }} style={{ color:'rgba(147, 148, 151, 0.50)'}} defaultChecked onChange={handleWhatsAppconcent} />
                    <ReceiveNotification variant='smallRegular'>I would like to get updates on WhatsApp </ReceiveNotification>
                </Stack>
           
            </Box>
        </Box>

         <Box mx='20px' mb='100px'>
            <Continuebutton
            variant='heading6Medium'
            sx={{ 
                backgroundImage: disablebutton === false && 'linear-gradient(to right,#FD5001,#EF1C26)',
                backgroundColor: disablebutton === true && 'rgba(147, 148, 151, 0.30)',
                color:disablebutton ? '#939497 !important' : '#fff'
            }}
            disabled={disableloader}
            onClick={handlePopup}>
                {disableloader ? 
                <CircularProgress color="inherit" sx={{height:'30px !important',width:'30px !important',fontSize:'10px' }} />
                :
                'Continue'
                }
            </Continuebutton>
         </Box>
         </Stack>
        </Box>

        { otppopup === true && 
        <Popupbox>
            <Box p='27px 29px 42px 30px' mx='20px' maxWidth='510px' sx={{ width:'100%',backgroundColor:'#fff',borderRadius:'16px',position:'relative'}}>
                { showtimer && <Box sx={{ position:'absolute',left:'50%',transform:'translateX(-50%)',top:'-50px',zIndex:5, }}>
                <Typography sx={{ fontSize:'25px',color:'#fff',fontFamily:'poppins' }}>{formatTime(time)}</Typography>
                </Box> }
               <Box display='flex' justifyContent='center'>
                   <img src={images.WHATSAPPBANNERLOGO} alt='whatsapp_banner_logo' height='89px' width='121px' />
               </Box>
               <ValidOTP variant='heading5Medium'>Enter a Valid OTP</ValidOTP>
               <Typography variant='paragraphRegular' color='#939497' mt='5px' textAlign='center' fontFamily='poppins'>
               Please enter valid OPT that received 
               <br></br>on
               <WhatsappNumber variant='paragraphRegular' >+91{customerdetail?.customer_details?.customer_mobile_no}</WhatsappNumber>
               </Typography>
               {/* <Grid container spacing={2} mt='23px' ml='8px'>
                {otp.map((value, index) => (
                    <Grid item key={index} xs={3} width='30px'>
                    <OtpTextfield
                        id={`otp-input-${index}`}
                        type="tel"
                        variant="outlined"
                        inputProps={{
                        maxLength: 1,
                        inputMode: 'numeric',
                        }}
                        sx={{
                            '& fieldset': {
                                borderBottom:  otp[index] === '' ? '1px solid rgba(147, 148, 151, 0.50)' :'1px solid #EF1C26',
                            }
                        }}
                        value={otp[index]}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                    />
                    </Grid>
                ))}
                </Grid> */}
                <Box sx={{ display:'flex',justifyContent:'center' }}>
                <OtpInput
                value={notp}
                onChange={setNotp}
                numInputs={4}
                
                inputStyle={{ 
                    justifyContent:"space-between",
                    columnGap:'10px',
                    padding:'8px',
                    marginLeft:'10px',
                    marginTop:'15px',
                    borderBottom:'1px solid rgba(147, 148, 151, 0.50)',
                    borderLeft:'none',
                    borderRight:'none',
                    borderTop:'none',
                    outline:'none',
                    width:'40px',
                    fontSize:'18px',  
                          
                }}
                
                inputType="tel"
                renderInput={(props) => <input type='tel' {...props} />}
                />
                </Box>
               <Box sx={{ textAlign:'center' }}>
               <Didnotrecieve variant='smallRegular'>Didn’t received yet ? </Didnotrecieve>
               </Box>
               {timerRunning === false &&
               <Stack flexDirection='row' justifyContent='center' alignItems='center'>
                <Typography variant='paragraphRegular' color='#EF1C26' fontFamily='poppins' sx={{ cursor:'pointer' }} onClick={handleStartTimer}>Resend OTP</Typography>
                <img src={images.FORWARDARROW} height='20px' width='20px' alt='forward' />
               </Stack>
                }
               {/* {otpvalidate  && (
               <VerifytextButton variant='heading6Medium' sx={{
                backgroundImage: 'linear-gradient(to right,#FD5001,#EF1C26)',
                color: '#FFF',
               }} onClick={handlePayment}>
                Verify & Pay
                </VerifytextButton>
                )} */}

               
                <VerifytextButton variant='heading6Medium' sx={{ 
                backgroundImage:notp.length === 4 && 'linear-gradient(to right,#FD5001,#EF1C26)',
                backgroundColor:notp.length !== 4 && '#9394974d',
                color: notp.length === 4 ? '#FFF' : '#939497'
                }} 
                disabled={disableloaderotp}
                onClick={handleSubmitotp}>
                {disableloaderotp ? 
                <CircularProgress color="inherit" sx={{height:'30px !important',width:'30px !important',fontSize:'10px' }} />
                :
                'Verify & Pay'
                }
                </VerifytextButton>
              

            </Box>
        </Popupbox>
       }
    </Box>
  )
}

export default UserInfo