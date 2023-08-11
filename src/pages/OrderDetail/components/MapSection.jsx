import { useRef , useState} from "react";
import { Box, Card, Typography } from "@mui/material";
import GoogleMapReact from 'google-map-react'
import { useGeolocation } from "@/utilities/location";
import useCustomer from "@/state/customer";

const defaultProps = {
    center: {
      lat: 12.9121,
      lng: 77.6446
    },
    zoom: 11
}
const origin = {
    lat: 12.9121,
    lng: 77.6446
}
// const destination = {
//     lat: 12.2958,
//     lng: 76.6394
// }

export default function MapSection() {
    const rendererRef = useRef()
    const serviceRef = useRef()
    const [distance, setDistance] = useState(null);
    const [duration, setDuration] = useState(null);
    const [streetViewUrl, setStreetViewUrl] = useState('');
    const { position, error, getCurrentLocation, locationSettled } = useGeolocation()
    const { customerOrderDetail,setEtaRestaurant } = useCustomer(state => state)
    //console.log("position ",position)
    const reslat = Object.keys(customerOrderDetail).length > 0 && customerOrderDetail?.restaurant_details?.restaurant_details?.address_list[0].latitude;
    const reslong = Object.keys(customerOrderDetail).length > 0 && customerOrderDetail?.restaurant_details?.restaurant_details?.address_list[0].longitude;

    // const origin = {
    //     lat: position.latitude,
    //     lng: position.longitude
    // }
    const destination = {
        lat: 12.8905705,
        lng: 77.4519752
    }

    const geteta = (timetaken) => {
        
        const currentTime = new Date();

        let hoursTaken = parseInt(timetaken.split(' ')[0]);
        let minutesTaken = parseInt(timetaken.split(' ')[2]);

        currentTime.setHours(currentTime.getHours() + hoursTaken);
        currentTime.setMinutes(currentTime.getMinutes() + minutesTaken);

        // Format the future time
        const futureHours = currentTime.getHours();
        const futureMinutes = currentTime.getMinutes();

        // Convert to 12-hour format
        const ampm = futureHours >= 12 ? 'PM' : 'AM';
        const formattedHours = futureHours % 12 === 0 ? 12 : futureHours % 12;
        const formattedMinutes = futureMinutes.toString().padStart(2, '0');

        // Result
        const futureTime = `${formattedHours}:${formattedMinutes}${ampm}`;
        return futureTime;
    }

    // function timecurrent(){
    //     var d = new Date();
    //     d.getHours();
    //     d.getMinutes();
    //     var hour;
    //     var min;
    //     var ampm = d.getHours() > 12 ? 'PM' : 'AM'
    //     if(d.getHours() > 12){
    //         hour = d.getHours() - 12;
    //     }else{
    //         hour = d.getHours(); 
    //     }
    //     if(d.getMinutes() > 9){
    //         min = d.getMinutes()
    //     }else{
    //         min = 0 + ''+ d.getMinutes()
    //     }
    //     return hour + ':' + min + '' + ampm;
    // }
    // function secondsToHms(d) {
    //     d = Number(d);
    //     var h = Math.floor(d / 3600);
    //     var m = Math.floor(d % 3600 / 60);
    //     var s = Math.floor(d % 3600 % 60);
    //     if(m > 9){
    //         m = m
    //     }else{
    //         m = 0 + '' + m 
    //     }
    //     return h + ':' + m; 
    // }
   
    const initiateMap = async google => {
        try {
            if (!!google) {
                rendererRef.current = new google.maps.DirectionsRenderer()
                serviceRef.current = new google.maps.DirectionsService()
            }
            const mapRenderer = rendererRef.current
            const mapService = serviceRef.current

            mapRenderer.setMap(google.map)
            
            const response = await mapService.route({
                origin,
                destination,
                travelMode: google.maps.TravelMode["DRIVING"],
                provideRouteAlternatives: true,
                optimizeWaypoints: true
            })
            mapRenderer.setDirections(response)
            const { AdvancedMarkerElement,Marker } = await google.maps.importLibrary("marker");
            new Marker({
                map: google.map,
                position: origin
            })
            new AdvancedMarkerElement({
                map: google.map,
                position: destination
            })
            const service = new google.maps.DistanceMatrixService();
         
            service.getDistanceMatrix(
                {
                  origins: [origin],
                  destinations: [destination],
                  travelMode: google.maps.TravelMode.DRIVING, // You can change this to the desired travel mode
                },
                (response, status) => {
                  if (status === 'OK' && response.rows[0].elements[0].status === 'OK') {
                    const distanceText = response.rows[0].elements[0].distance.text;
                    const durationText = response.rows[0].elements[0].duration.text;
                    const secondduration = response.rows[0].elements[0].duration.value;
                    // const expecttime = secondsToHms(secondduration)
                    // const currenttime = timecurrent()
                    const eta = geteta(durationText)
                    setEtaRestaurant(eta)
                    //console.log('eta ',eta)
                   
                    setDistance(distanceText);
                    setDuration(durationText);
                  } else {
                    console.log('Error calculating distance:', status);
                  }
                }
              );

        }
        catch (err) {
            console.log("Error", err)
        }
    }

    return (
        <Card sx={{ mb: 10,position:'relative' }}>
            {/* <Box py={6} display="flex" justifyContent="space-between" alignItems="center" px={9}>
                <Typography variant="heading6Medium">The Healthy Eatery</Typography>
                <Box textAlign="center">
                    <Typography color="mainGray.main" variant="paragraphRegular">ETA</Typography>
                    <Typography color="primary.main" variant="heading6Medium">9:30PM</Typography>
                </Box>
            </Box> */}
            <Box height={250}>
                {!!reslat && !!reslong && (
                    <GoogleMapReact
                        yesIWantToUseGoogleMapApiInternals
                        onGoogleApiLoaded={initiateMap}
                        bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_API_KEY }}
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                        options={{
                            mapId: "DEMO_MAP_ID",
                        }}
                    />
                   
                   
                )}
            </Box>
            <Box sx={{ backgroundColor:'#fff',position:'absolute',bottom:'10px',left:'20px',display:'flex',flexDirection:'row',padding:'5px 10px',borderRadius:'7px' }}>
                {duration && distance && (
                    <>
                    <Typography variant="paragraphRegular" color='#e07f16' fontFamily='Poppins'>{duration}</Typography>
                    <Typography variant="paragraphRegular" ml='5px' fontFamily='Poppins'>({distance})</Typography>
                    
                    </>
                )}

            </Box>
            
        </Card>
    )
}