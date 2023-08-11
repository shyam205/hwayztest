import { useRef } from "react";
import { Box, Card, Typography } from "@mui/material";
import GoogleMapReact from 'google-map-react'

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
const destination = {
    lat: 12.2958,
    lng: 76.6394
}

export default function MapSection() {
    const rendererRef = useRef()
    const serviceRef = useRef()

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
            const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
            new AdvancedMarkerElement({
                map: google.map,
                position: origin
            })
            new AdvancedMarkerElement({
                map: google.map,
                position: destination
            })
        }
        catch (err) {
            console.log("Error", err)
        }
    }

    return (
        <Card sx={{ mb: 10 }}>
            <Box py={6} display="flex" justifyContent="space-between" alignItems="center" px={9}>
                <Typography variant="heading6Medium">The Healthy Eatery</Typography>
                <Box textAlign="center">
                    <Typography color="mainGray.main" variant="paragraphRegular">ETA</Typography>
                    <Typography color="primary.main" variant="heading6Medium">9:30PM</Typography>
                </Box>
            </Box>
            <Box height={250}>
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
            </Box>
        </Card>
    )
}