import React, { useEffect, useState, useRef } from 'react'
import images from "@/utilities/images";
import { Box, Button, Typography, styled, Radio, FormControlLabel, Divider, Stack, IconButton, Select,MenuItem } from '@mui/material'
import { useForm } from "react-hook-form";
import CustomButton from '@/components/Button';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useNavigate } from 'react-router-dom';
//import { locationSchema } from '@/schemas/location';
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { stationSchema } from '@/schemas/station';
import { fetchRoutedetail, getRestaurants } from '@/api/stores';
import useCustomer from '@/state/customer';
import { useInfiniteQuery } from "@tanstack/react-query";
import route from '../../../routes.mapping'
import useOutsideAlerter from '@/components/Customhook';
import { useOutsideAlerterbox } from '@/components/Customhook';
import CircularProgress from '@mui/material/CircularProgress';

const Locationdata = [
      {
        id: 1,
        name: 'Bangalore'
      },
      {
          id: 2,
          name: 'Pune'
      },
      {
          id: 3,
          name: 'Chennai'
      },
      {
        id: 4,
        name: 'Pune'
      },
      {
        id: 5,
        name: 'Chennai'
      },
      {
        id: 6,
        name: 'Bangalore'
      },
      {
        id: 7,
        name: 'Pune'
      },
      {
        id: 8,
        name: 'Chennai'
      },
      {
        id: 9,
        name: 'Bangalore'
      }
]

const LocationFromto = {
    from: 'Bangalore',
    to: 'Pune'
}

const StyledBannerThirdImageBox = styled("img")(({ theme }) => ({
    width: '100%',
    height: '100%',
    // objectFit: 'cover',
    [theme.breakpoints.up('480')]: {
      objectFit: 'cover',
    },
    objectPosition: 'center'
  }))

  const HeaderRightBox = styled(Box)(({ theme }) => ({
   position: 'absolute',
   top: '0',
   left: '0',
   width: '100%'
  }))

  const HeaderRightBoxWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
   }))

   const BoxBottom = styled(Box)(({ theme }) => ({
    paddingLeft: '20px',
    paddingRight: '20px',
    lineHeight: '45px'
   }))
  
   const Travelheading = styled(Typography)(({ theme }) => ({
    color: '#939497',
    lineHeight: '150%',
    fontFamily:'poppins'
  }))

  const FlexContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center'
  }))

  const FlexWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between', 
    width: '100%', 
    alignItems: 'baseline !important'
  }))

  const BlackRadio = styled(Radio)(({ theme }) => ({
    color: '#000000 !important',
    '&$checked': {
        color: '#000000',
      },
      '& .MuiSvgIcon-root': {
        fontSize: 14,
      },
  }))

  const RedRadio = styled(Radio)(({ theme }) => ({
    color: 'red !important',
    '&$checked': {
        color: '##EF1C26 !important',
      },
      '& .MuiSvgIcon-root': {
        fontSize: 14,
      },
  }))

  const CustomDropdown = styled(Box)(({ theme }) => ({ 
     boxShadow:'0px 4px 15px rgb(0,0,0,0.1)',
     padding: '15px 17px 17px 19px',
     backgroundColor: '#fff',
     height: '138px',
     overflowY: 'scroll',
     flexFlow: 1,
     position:'absolute',
     top:0,
     left: 0,
     zIndex: 5,
     borderRadius: '10px',
     width:'85%'
  }))

  const CustomLoader = styled(Box)(({ theme }) => ({ 
    height:'100vh',
    width:'100%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
 }))

  const Formcontrol = styled(FormControl)(({ theme }) => ({
    "& .MuiInputBase-root": {
      color:'#fff',
      borderColor: "#fff",
      borderWidth: "1px",
      borderStyle: "solid",
      minWidth: "120px",
      justifyContent: "center",
      outline: 'none'
    },
    "& .MuiSelect-select.MuiSelect-select": {
      paddingRight: "0px"
    },
    '.MuiInput-input':{ 
      border:'1px solid #fff'
     },
  }))


  const Selectoption = styled(Select)(({ theme }) => ({
    width: "auto",
    "&:focus": {
      backgroundColor: "transparent !important",
      outline:'none !important'
    }
  }))


function Bannerthird() {

  const {source,destination,setSourceDestination,travel_partner_id,vehicle_id,primary_route_id,route_list} = useCustomer(state => state)
  const [location1,setLocation1] = useState(false)
  const [location2,setLocation2] = useState(false)
  const [loaction1data,setLocation1data] = useState('')
  const [loaction2data,setLocation2data] = useState('')
  const [buttonstatus,setButtonstatus] = useState(false)
  const [selectedFirstLocation,setSelectedFirstLocation] = useState('')
  const [selectedSecondLocation,setSelectedSecondLocation] = useState('')
  const [loading,setLoading] = useState(true)
  const navigate = useNavigate();
  const { register, control, formState: { errors, isSubmitting }, handleSubmit } = useForm({
    resolver: yupResolver(stationSchema)
  })
  const { id } = useParams();

  
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } = useInfiniteQuery({
    queryKey: [`route-detail`],
    queryFn: ({ pages }) => fetchRoutedetail(id),
    onSuccess: (response) => {
    
        const source = response?.pages[0]?.data?.vehicle_details?.primary_route_from;
        const destination = response?.pages[0]?.data?.vehicle_details?.primary_route_to;
        const travel_partner_id= response?.pages[0]?.data?.tp_details?.travel_partner_id;
        const vehicle_id= response?.pages[0]?.data?.vehicle_details?.vehicle_id;
        const primary_route_id= response?.pages[0]?.data?.vehicle_details?.primary_route_id;
        const route_list = response?.pages[0]?.data?.route_list;
        
        setSourceDestination(loaction1data || source,loaction2data || destination,travel_partner_id,vehicle_id,primary_route_id,route_list)
        setLoading(false)
    },
    onError: (error) => {
      // ErrorToast('Something went wrong')
      console.log("errror ",error)
    },
  })


  const handleClick = (e) => {
      e.preventDefault();
      
      let filteredLocations = route_list.filter(route => route.from === (loaction1data || source) && route.to === (loaction2data || destination));
      
      setSourceDestination(loaction1data || source,loaction2data || destination,travel_partner_id,vehicle_id,filteredLocations[0].id,route_list)
      navigate(`${route.LANDING}`, { replace: true })

      if(loaction1data === loaction2data){
          toast.error('Both Location should be different!', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
              return
      }
      else{
          // navigate('/landing', { replace: true })
      }
    };

    const menuProps = {
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center"
      },
      transformOrigin: {
        vertical: "top",
        horizontal: "center"
      },
      getContentAnchorEl: null
    };

    const handleToLocation = (x) => {
    
      let filteredLocations = route_list.filter(route => route.from === (loaction1data || source) && route.to === (x || destination));
      setSourceDestination(loaction1data || source,x || destination,travel_partner_id,vehicle_id,filteredLocations[0].id,route_list)
  }

  const handleFromLocation = (y) => {
    let filteredLocations = route_list.filter(route => route.from === (y || source) && route.to === (loaction2data || destination));
      setSourceDestination(y || source,loaction2data || destination,travel_partner_id,vehicle_id,filteredLocations[0].id,route_list)
  }

    const handleSelectedoptionfirst = (x) => {
      setLocation1(!location1)
      setLocation1data(x)
      
    }
    const handleSelectedoptionsecond = (x) => {
      setLocation2(false)
      setLocation2data(x)
    }


    const box = useRef(null);
    useOutsideAlerter(box,setLocation1);

    const box1 = useRef(null);
    useOutsideAlerterbox(box1,setLocation2);

    useEffect(() => {
      
      if(source && destination){
        setButtonstatus(true)
        
      }
    },[source,destination])

    
  return (
    <>
    {loading === true ? 
    <CustomLoader>
    <CircularProgress />
    </CustomLoader>
    : (
     <Box sx={{ height:'100vh'}}>
          <Box sx={{ height:'457px',position:'relative'}}>
              <StyledBannerThirdImageBox src={images.Bannerthird} alt='Hwayz' />
              <HeaderRightBox>
                  <HeaderRightBoxWrapper mx='20px' marginTop='38px'>
                      <Box ml='10px'>
                      <img src={images.Companylogo}  width='114.123px' height='40px' alt='hwayz' />
                      </Box>
                      <Box sx={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                      <IconButton sx={{ padding:'0px' }} onClick={() => navigate('/notifications', { replace: true })}>
                        <StyledBannerThirdImageBox src={images.Information} alt='notification' />
                      </IconButton>
                      <IconButton sx={{ padding:'0px' }} variant="text" onClick={() => navigate('/faq', { replace: true })}>
                          <Typography variant='smallRegular' ml='6px' color='#939497' sx={{ fontFamily:'poppins' }}>Help</Typography>
                      </IconButton>
                      </Box>
                  </HeaderRightBoxWrapper>
              </HeaderRightBox>
          </Box>
          <BoxBottom>
              <Travelheading mt='15px' variant='heading6Regular'>
              Welcome You’re travelling
              </Travelheading>
                <FlexContainer flexDirection='column'>
                  <FlexContainer flexDirection='row' width='100%'>
                      <FlexWrapper>
                          <Box>
                          <Stack sx={{ flexDirection:'column',justifyContent:'center',alignItems:'center' }}>
                              <Box width='12px' height='12px'>
                                  <FormControlLabel
                                      value="black"
                                      control={<BlackRadio />}
                                      checked={true}
                                      sx={{
                                          position:'relative',
                                          zIndex:'5 !important'
                                      }}
                                  />
                              </Box>
                              <Box mt='8px' border='1px solid white' transform='translateY(0)'>
                              <hr width='100%' style={{ border:'1px solid white',transform:'rotateZ(180deg)',height:'75px',borderRight:'1px dotted gray' }}></hr>
                              </Box>
                            </Stack>
                            <Stack mt='-27px' sx={{ flexDirection:'column',justifyContent:'center',alignItems:'center' }}>
                            
                              <Box width='12px' height='12px'>
                                  <FormControlLabel
                                      value="black"
                                      control={<RedRadio />}
                                      checked={true}
                                  />
                              </Box>
                            </Stack>
                          </Box>
                          
                          <Box flexGrow={1}>
                          <Box flexGrow={1} ml='14px'>
                              <Typography variant='heading6Regular' color='#939497' lineHeight='24px' sx={{ fontFamily:'poppins' }}>From</Typography>
                              <Box mt='0' mb='17.5px' display='flex' justifyContent='space-between' alignItems='flex-start'>
                              
                              <Box sx={{ position:'relative',width:'100%',display:'flex',flexDirection:'column' }} ref={box}>
                              <Typography sx={{
                                      fontSize:'18px !important',
                                      fontWeight: 500,
                                      color: '#0E0F13',
                                      fontFamily:'poppins',
                                      cursor: 'pointer',
                                      lineHeight:'150%'}} onClick={() => setLocation1(true)} {...register("station")}>
                                  {loaction1data || source || 'Bangalore2'}
                              </Typography>

                                { location1 === true && (
                                  <CustomDropdown>
                                {  route_list.length >0 && route_list.map((data,i) => (
                                  <Box mt='10px' key={i} onClick={() => handleSelectedoptionfirst(data.from)}>
                                    <Typography variant='heading6Regular' sx={{ color:'#939497',fontFamily:'poppins',lineHeight:'150%',cursor:'pointer' }} onClick={() => handleFromLocation(data.from)}>{data.from}</Typography>
                                  </Box>
                                ))}
                                  </CustomDropdown>
                                  )}
                              </Box>

                              <img src={images.DIRECTIONDOWNLOGO} alt='down' />
                              </Box>
                          </Box>
                          <Divider border='0.5 px rgba(147, 148, 151, 0.5)' width='95%' ml='10px !important' sx={{ marginLeft:'15px',mb:'19.5px'}} />

                          <Box flexGrow={1} ml='14px'>
                          <Typography variant='heading6Regular' color='#939497' lineHeight='24px' sx={{ fontFamily:'poppins' }}>To</Typography>
                              <Box display='flex' justifyContent='space-between' alignItems='center'>
                              
                              <Box sx={{ position:'relative',width:'100%',display:'flex',flexDirection:'column' }} ref={box1}>
                              <Typography sx={{
                                      fontSize:'18px !important',
                                      fontWeight: 500,
                                      color: '#0E0F13',
                                      fontFamily:'poppins',
                                      cursor: 'pointer',
                                      lineHeight:'150%'}} onClick={() => setLocation2(true)} {...register("station")}>
                                  {loaction2data || destination || 'Pune2'}
                              </Typography>

                                { location2 === true && (
                                  <CustomDropdown>
                                {  route_list.length >0 && route_list.map((data,i) => (
                                  <Box mt='10px' key={i} onClick={() => handleSelectedoptionsecond(data.to)}>
                                    <Typography variant='heading6Regular' sx={{ color:'#939497',fontFamily:'poppins',lineHeight:'150%',cursor:'pointer' }} onClick={() => handleToLocation(data.to)}>{data.to}</Typography>
                                  </Box>
                                ))}
                                  </CustomDropdown>
                                  )}
                              </Box>
                              <img src={images.DIRECTIONDOWNLOGO} alt='down' />
                              </Box>
                          </Box>
                          </Box>
                      </FlexWrapper>
                  </FlexContainer>
                  
                  <FlexWrapper>
                              
                          
                  </FlexWrapper>
                </FlexContainer>

              <Box mt='37px' pb='55px'>
              <CustomButton text='Continue' status={buttonstatus} sx={{ fontFamily:'poppins' }} onClick={handleClick} />
              </Box>
            
          </BoxBottom>
      </Box>
    ) }
    </>
  )
}

export default Bannerthird