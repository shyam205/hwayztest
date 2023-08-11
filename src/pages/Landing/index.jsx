import { useInfiniteQuery } from "@tanstack/react-query";
import { Box, Typography,IconButton } from "@mui/material";
import { styled } from '@mui/material/styles'
import images from "@/utilities/images";
import GeoError from "@/components/GeoError";
import { getOrderdetail, getStoresList } from "@/api/stores";
import { useGeolocation } from "@/utilities/location";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { SvgIcon } from '@mui/material';
import { useState,useRef,useEffect } from "react";
import { lazy, Suspense } from 'react'
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import {useNavigate} from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { fetchRestaurantandstops } from "@/api/stores";
import useOutsideAlerter from "@/components/Customhook";
import { useOutsideAlerterbox } from "@/components/Customhook";
import StoreCardPlaceholder from "@/loaders/StoreCardPlaceholder";
import useCustomer from "@/state/customer";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
const Thankyoubannner = lazy(() => import('@/pages/Landing/components/Thankyoubannner'));
const Prebookmeal = lazy(() => import('@/pages/Landing/components/Prebookmeal'));
const Upcomingstop = lazy(() => import('@/pages/Landing/components/UpcomingStops'));
const RestaurantList = lazy(() => import('@/pages/Landing/components/RestaurantList'));


var Customerorder = {
  orderaccepted : false,
  orderprepare :false
}

const Img = styled("img")`
    height: 35px;
    aspect-ratio: ${props => props.aspectRatio};
`

const Root = styled(Box)`
    height: 100vh;
    overflow-y: scroll;
    box-sizing: border-box;
`
const Hlogo = styled("img")(({ theme }) => ({
    height: '24px',
    width: '23.62px'
  }))

  const VRLlogo = styled("img")(({ theme }) => ({
    height: '18px',
    width: '45.73px'
  }))

  const Notifylogo = styled("img")(({ theme }) => ({
    height: '20px',
    width: '20px'
  }))

const FlexContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    boxSizing: 'border-box',
    width: '100%'
  }))

  const LocationBox = styled(Box)(({ theme }) => ({
    backgroundColor: 'white',
    boxShadow: '0px 15px 11px rgba(63, 63, 63, 0.05)', 
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }))

  const TextTravel = styled(Typography)(({ theme }) => ({
    color: '#939497',
    lineHeight: '14px',
    marginTop: '27px',
    fontFamily:'Poppins'
  }))

  const Linebreak = styled(Box)(({ theme }) => ({
    width: '20px', 
    border: '0.5px solid #939497', 
    marginLeft: '10.38px',
    marginRight: '10px'
  }))

  const PopupBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: '0',
    left: 0,
    height:'max-content',
    paddingBottom:'20px',
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent:'end',
    flexDirection: 'column',
    rowGap:'20px'
  }))

  const PopupBoxWrapper = styled(Box)(({ theme }) => ({
    maxWidth: '546px',
    width: 'calc(100% - 24px)',
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    columnGap: '12px',
    backgroundColor: '#0E0F13',
    borderRadius: '10px',
    boxShadow: '0px 15px 25px 0px rgba(79, 0, 4, 0.50)',
    padding: '15px'
  }))

  const PopupHeading = styled(Typography)(({ theme }) => ({
    lineHeight: '150%',
    fontFamily: 'Poppins',
    color: '#fff'
  }))

  const PopupDescription = styled(Typography)(({ theme }) => ({
    color: 'rgba(255,255,255,0.5)',
    lineHeight: '150%',
    fontFamily: 'Poppins'
  }))

  const Infologo = styled("img")(({ theme }) => ({
    height: '20px',
    width: '20px',
    marginLeft: '15px',
    marginRight: '6px'
  }))

  const LocationWrapper = styled(Box)(({ theme }) => ({
    marginLeft: '8px', 
    marginRight: '-8px', 
    display: 'flex', 
    justifyContent: 'left', 
    alignItems: 'center'
  }))

  const LocationWrappersecond = styled(Box)(({ theme }) => ({
    display: 'flex', 
    justifyContent: 'left', 
    alignItems: 'center'
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
    width:'150px'
 }))


export default function Landing() {
    const { position, error, getCurrentLocation, locationSettled } = useGeolocation()
    // const { data, fetchNextPage, hasNextPage, isFetching, isLoading } = useInfiniteQuery({
    //     queryKey: [`store-list-${position.latitude}-${position.longitude}`],
    //     queryFn: ({ pageParam }) => getStoresList(position, pageParam, 10),
    //     enabled: !!position?.latitude,
    //     getNextPageParam: (lastPage, pages) => lastPage?.length === 10? pages.length: undefined,
    // })
    const states = useCustomer(state => state)
    const {
        source,
        destination,
        travel_partner_id,
        vehicle_id,
        primary_route_id,
        restaurant_list,
        upcoming_stop_list,
        setRestaurants,
        route_list,
        setSourceDestination,
        setTradename,
        tradename,
        customerOrderDetail,
        setActivestop,
        activestop,
        activestopId,
        order_status,
        order_status_heading,
        order_status_subheading,
        setStopIdRestaurantId,
        setCustomerOrderdeatil,
        dynamicorder
    } = useCustomer(state => state)
     //console.log("klj",customerOrderDetail)
    const [location1,setLocation1] = useState(false)
    const [location2,setLocation2] = useState(false)
    const [loaction1data,setLocation1data] = useState('')
    const [loaction2data,setLocation2data] = useState('')
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();
    const { data, isFetching, isLoading,refetch } = useQuery({
        queryKey: [`restaurant-details`,loaction2data,loaction1data],
        queryFn: () => fetchRestaurantandstops(
            travel_partner_id,vehicle_id,primary_route_id,
          ),
          keepPreviousData: true,
          onSuccess: (response) => {
             //console.log("response ",response)
             const restaurant_list = response?.data?.restaurant_list;
             const upcoming_stop_list = response?.data?.upcoming_stop_list;
             const tradenames = response?.data?.tp_details?.trade_name;
             const cuttentstop = response?.data?.upcoming_stop_list[0]?.stop_name;
             const activestopID = response?.data?.upcoming_stop_list[0]?.id;
             const restaurantIds = response?.data?.stop_id_to_restaurant_id_list;
             setRestaurants(restaurant_list, upcoming_stop_list);
             setTradename(tradenames)
             setActivestop(cuttentstop,activestopID)
             setStopIdRestaurantId(restaurantIds)
          }
      })

      const { fetchNextPage, hasNextPage } = useQuery({
        queryKey: [`order-details`],
        queryFn: () => getOrderdetail(customerOrderDetail?.order_details?.order_number),
          onSuccess: (response) => {
            //console.log("responses ",response);
            if( response.status === "success" && response.message === 'Order is fetched successfully.'){
             const orderstatus = response?.data?.order_details?.order_status;
             const statusheading = response?.data?.order_details?.order_status_heading;
             const statussubheading = response?.data?.order_details?.order_status_subheading;
             setCustomerOrderdeatil(response?.data)
            }
           
          },
          refetchInterval: 15000,
      },[])

      const handleClose = () => {
        setOpen(false);
      };
     //console.log("activestop ",activestop)
    // const handleScroll = e => {
    //     const target = e.target
    //     if (target.scrollHeight-target.scrollTop - target.clientHeight < 10 && !isFetching) {
    //         //console.log("End reached", hasNextPage)
    //         fetchNextPage()
    //     }
    // }
   //console.log("tradename ",tradename)
    const handleToLocation = (x) => {
        
        //console.log("start",loaction1data || source,x || destination)
      
        let filteredLocations = route_list.filter(route => route.from === (loaction1data || source) && route.to === (x || destination));
            // console.log("filteredLocations ",filteredLocations)
        setSourceDestination(loaction1data || source,x || destination,travel_partner_id,vehicle_id,filteredLocations[0].id,route_list)
        // console.log("after change",loaction1data || source,x || destination,filteredLocations[0].id)
        // refetch([`restaurant-details`,travel_partner_id,vehicle_id,primary_route_id])

    }

    const handleOrderdetail = (orderId) => {
        //navigate(`/order-detail/${customerOrderDetail?.order_details?.order_number}`)
        navigate(`/order-detail/${orderId}`)
    }

    const handleSelectedoptionfirst = (x,id) => {
        setLocation1(!location1)
        setLocation1data(x)
        // setSourceDestination(x || source,loaction2data || destination,travel_partner_id,vehicle_id,id,route_list)
        // refetch()
      }

      const handleSelectedoptionsecond = (x,id) => {
        setLocation2(false)
        setLocation2data(x)
        // setSourceDestination(loaction1data || source,x || destination,travel_partner_id,vehicle_id,id,route_list)
        // refetch()
        // console.log("ghfhf")
      }

      const box = useRef(null);
      useOutsideAlerter(box,setLocation1);
  
      const box1 = useRef(null);
      useOutsideAlerterbox(box1,setLocation2);

    //   if (error) {
    //     return (
    //     <>
    //     <GeoError errorCode={error} handleRetry={getCurrentLocation} />
    //     <Dialog
    //     width='100%'
    //     maxWidth='600px'
    //     open={open}
    //     onClose={handleClose}
    //     aria-labelledby="responsive-dialog-title"
    //   >
    //     <DialogTitle id="responsive-dialog-title">
    //     </DialogTitle>
    //     <DialogContent>
    //       <DialogContentText>
    //         Please allow access to you location for your smooth journey
    //       </DialogContentText>
    //     </DialogContent>
        
    //   </Dialog>
    //     </>
    //     )
    // }
    return (
        <Root py={9} px={6}
        //  onScroll={handleScroll}
          backgroundColor='#F9F9F9'>
          <>
            <FlexContainer justifyContent='space-between !important' pt='11px' sx={{ position:'relative' }}>
                <FlexContainer>
                   <Hlogo src={images.Hlogo} alt='hwayz' />
                   {/* <Linebreak sx={{ transform:'rotateZ(90deg)'}}></Linebreak> */}
                   {/* <VRLlogo src={images.VRlogo} alt='hwayz' /> */}
                </FlexContainer>
                <FlexContainer justifyContent='space-between !important' width='max-content !important'>
                   {/* <IconButton sx={{ p:0 }} onClick={() => navigate('/notifications')}><Notifylogo src={images.NOTIFICATIONICON} alt='notification' /></IconButton> */}
                   {/* <SvgIcon style={{ color:"#939497" }} sx={{ height:'20px',width:'20px',ml:'15px',mr:'6px' }}><InfoOutlinedIcon /></SvgIcon> */}
                   <IconButton sx={{ padding:'0px' }} onClick={()=> navigate("/faq")}><Infologo src={images.Information} alt='info' />
                   <Typography variant="smallRegular" color='#939497' sx={{ fontFamily:'Poppins' }}>Help</Typography></IconButton>
                </FlexContainer>
            </FlexContainer>
            <TextTravel variant="smallRegular">Traveling to</TextTravel>
            <FlexContainer mt='9px'>
                  <Box sx={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                    <LocationBox p='7px'>
                      <img src={images.ARRIVAL_LOGO} height='20px' width='20px' alt='arrival' />
                    </LocationBox>
                    <LocationWrapper>
                       
                        <Box sx={{ position:'relative',width:'150%',display:'flex',flexDirection:'column' }} ref={box}>
                                        <Typography sx={{
                                               
                                                color: '#0E0F13',
                                                fontFamily:'poppins',
                                                fontSize: '14px',
                                                cursor: 'pointer',
                                                lineHeight:'150%'}} onClick={() => setLocation1(true)}>
                                            {loaction1data || source || 'Bangalore'}
                                        </Typography>

                                          { location1 === true && (
                                            <CustomDropdown sx={{ transform:'translateY(30px)' }}>
                                          {  route_list.length >0 && route_list.map((data,i) => (
                                            <Box mt='10px' key={i} onClick={() => handleSelectedoptionfirst(data.from,data.id)}>
                                              <Typography variant='heading6Regular' sx={{ color:'#939497',fontFamily:'poppins',lineHeight:'150%',cursor:'pointer' }}>{data.from}</Typography>
                                            </Box>
                                          ))}
                                            </CustomDropdown>
                                            )}
                        </Box>
                        <img src={images.DIRECTIONDOWNLOGO} alt='down' />
                    </LocationWrapper>
                  </Box>
                  <Box sx={{ border:'1px dashed rgb(147, 148, 151,0.5)',flexGrow:'1',mx:'8px'}}></Box>
                  {/* <img src={images.LOCATIONLINE} alt='location-breaker' style={{ flexGrow:1,marginRight:'11px',marginLeft:'8px' }} /> */}
                  <Box sx={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                    <LocationBox p='7px'> <img src={images.DESTINATION_LOGO} height='20px' width='20px' alt='destination' /></LocationBox>
                    <LocationWrappersecond mx='12px'>
                   
                        <Box sx={{ position:'relative',width:'150%',display:'flex',flexDirection:'column' }} ref={box1}>
                                        <Typography sx={{
                                                variant: 'paragraphMedium',
                                                color: '#0E0F13',
                                                fontFamily:'poppins',
                                                fontSize: '14px',
                                                cursor: 'pointer',
                                                lineHeight:'150%'}} onClick={() => setLocation2(true)}>
                                            {loaction2data ||  destination || 'Bangalore'}
                                        </Typography>

                                          { location2 === true && (
                                            <CustomDropdown sx={{ transform:'translate(-150px,30px)' }}>
                                          {  route_list.length >0 && route_list.map((data,i) => (
                                            <Box mt='10px' key={i} onClick={() => handleSelectedoptionsecond(data.to,data.id)}>
                                              <Typography variant='heading6Regular' sx={{ color:'#939497',fontFamily:'poppins',lineHeight:'150%',cursor:'pointer' }} onClick={() => handleToLocation(data.to)}>{data.to}</Typography>
                                            </Box>
                                          ))}
                                            </CustomDropdown>
                                            )}
                        </Box>
                        <img src={images.DIRECTIONDOWNLOGO} alt='down' />
                    </LocationWrappersecond>
                  </Box>
            </FlexContainer>

            <Suspense fallback={<StoreCardPlaceholder />}>
            {tradename && <Thankyoubannner tradename={tradename} /> }
            </Suspense>
            <Suspense fallback={<StoreCardPlaceholder />}>
            <Prebookmeal />
            </Suspense>
            <Suspense fallback={<StoreCardPlaceholder />}>
            { upcoming_stop_list && <Upcomingstop upcoming_stop_list={upcoming_stop_list} /> }
            </Suspense>
            <Suspense fallback={<StoreCardPlaceholder />}>
            { restaurant_list && activestop && <RestaurantList restaurant_list={restaurant_list} activestop={activestop} /> }
            </Suspense>
            
            <PopupBox>
            {
                dynamicorder.map((order,i) => (
                    <Box key={i} mx='auto' sx={{ maxWidth:'600px',width:'100%' }}>
                        <Box sx={{ cursor:'pointer' }} onClick={() => handleOrderdetail(Object.values(order).length > 0 && Object.keys(order))}>
                        <PopupBoxWrapper sx={{ marginLeft: {xs:'12px'}, marginRight: {xs:'12px'} }}>
                            <Box>
                                {Object.values(order).length > 0 && order[Object.keys(order)].order_details?.order_status === 'new' &&
                                <img src={images.ORDERCOMPLETELOGO} alt='ordercomplete' />
                                }
                                 {Object.values(order).length > 0 && order[Object.keys(order)].order_details?.order_status === 'complete' &&
                                <img src={images.ORDERPREPARE} alt='ordercomplete' />
                                }
                                {Object.values(order).length > 0 && order[Object.keys(order)].order_details?.order_status === 'preparing' &&
                                <img src={images.ORDERCOMPLETELOGO} alt='ordercomplete' />
                                }
                                 {Object.values(order).length > 0 && order[Object.keys(order)].order_details?.order_status === 'accepted' &&
                                <img src={images.ORDERPREPARE} alt='ordercomplete' />
                                }
                            </Box>
                            <Box>
                            <PopupHeading variant="heading6Medium">{Object.values(order).length > 0 && order[Object.keys(order)].order_details?.order_status_heading}</PopupHeading>
                            <PopupDescription variant="smallRegular">{Object.values(order).length > 0 && order[Object.keys(order)].order_details?.order_status_subheading} </PopupDescription>
                            </Box>
                            </PopupBoxWrapper>
                        </Box>
                    </Box>
                ))
            }
            </PopupBox>
            {/* {  order_status_heading && order_status_subheading && order_status === 'new' && 
            <PopupBox sx={{ cursor:'pointer' }} onClick={handleOrderdetail}>
              <PopupBoxWrapper sx={{ marginLeft: {xs:'12px'}, marginRight: {xs:'12px'} }}>
                <Box><img src={images.ORDERCOMPLETELOGO} alt='ordercomplete' /></Box>
                <Box>
                  <PopupHeading variant="heading6Medium">{order_status_heading}</PopupHeading>
                  <PopupDescription variant="smallRegular">{order_status_subheading} </PopupDescription>
                </Box>
                </PopupBoxWrapper>
            </PopupBox>
             } */}

            {/* {  order_status_heading && order_status_subheading && order_status === 'accepted' && 
            <PopupBox>
              <PopupBoxWrapper sx={{ marginLeft: {xs:'12px'}, marginRight: {xs:'12px'} }}>
                <Box><img src={images.ORDERCOMPLETELOGO} alt='ordercomplete' /></Box>
                <Box>
                  <PopupHeading variant="heading6Medium">{order_status_heading}</PopupHeading>
                  <PopupDescription variant="smallRegular">{order_status_subheading} </PopupDescription>
                </Box>
                </PopupBoxWrapper>
            </PopupBox>
             } */}

          {/* {order_status_heading && order_status_subheading && order_status === 'preparing' && 
            <PopupBox>
              <PopupBoxWrapper sx={{ marginLeft: {xs:'12px'}, marginRight: {xs:'12px'} }}>
                <Box><img src={images.ORDERPREPARE} alt='ordercomplete' /></Box>
                <Box>
                  <PopupHeading variant="heading6Medium">{order_status_heading}</PopupHeading>
                  <PopupDescription variant="smallRegular">{order_status_subheading} </PopupDescription>
                </Box>
              </PopupBoxWrapper>
            </PopupBox>
          } */}

            {/* {order_status_heading && order_status_subheading && order_status === 'complete' && 
            <PopupBox>
              <PopupBoxWrapper sx={{ marginLeft: {xs:'12px'}, marginRight: {xs:'12px'} }}>
                <Box><img src={images.ORDERPREPARE} alt='ordercomplete' /></Box>
                <Box>
                  <PopupHeading variant="heading6Medium">{order_status_heading}</PopupHeading>
                  <PopupDescription variant="smallRegular">{order_status_subheading} </PopupDescription>
                </Box>
              </PopupBoxWrapper>
            </PopupBox>
          } */}
            </>
        </Root>
    )
}