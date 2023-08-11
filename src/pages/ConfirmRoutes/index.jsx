import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from "react-router-dom"
import { Typography, styled, Box, Button } from "@mui/material"
import { toast } from 'react-toastify';
import routesMapping from '@/routes.mapping'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import images from '@/utilities/images'
import CityDropdown from './components/CityDropdown'
import { RootContainer } from '../pages.styles'
import useCustomer from '@/state/customer';
import { useGeolocation } from '@/utilities/location';

const ConfirmContainer = styled(Box)`
    display: flex;
    flex-flow: column;
    align-items: center;
    background: white;
    width: clamp(300px, 70%, 500px);
    flex: 1;
`

const Logo = styled("img")`
    width: 45%;
    min-width: 114px;
    aspect-ratio: 114.24 / 40;
    margin-bottom: 40px;
`

export default function ConfirmRoutes() {
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const [source, setSource] = useState(() => params.get("source"))
    const [destination, setDestination] = useState(() => params.get("destination"))
    const setRouteDetails = useCustomer(state => state.setRouteDetails)
    const { position, getCurrentLocation } = useGeolocation()

    useEffect(() => {
        getCurrentLocation()
    }, [])

    const handleConfirmation = () => {
        setRouteDetails(params.get("routeId"), { latitude: position.latitude, longitude: position.longitude })
        navigate(routesMapping.LANDING)
    }

    const handleSourceClick = city => {
        if (city === destination) {
            toast.warning("Source can't be same as destination")
            return
        }
        setSource(city)
    }

    const handleDestinationClick = city => {
        if (city === source) {
            toast.warn("Destination can't be same as source")
            return
        }
        setDestination(city)
    }
    
    return (
        <RootContainer
            display="flex"
            flexDirection="column"
            px={10}
            pt={30}
            pb={10}
        >
            <ConfirmContainer mx="auto">
                <Logo src={images.COMPANY_LOGO} alt="Company Logo" />
                <Typography variant="heading5Medium">You're travelling from</Typography>
                <CityDropdown
                    list={["Mumbai", "Goa", "Pune"]}
                    selected={source}
                    setSelected={handleSourceClick}
                />
                <Typography my={5} variant="heading5Medium">To</Typography>
                <CityDropdown
                    list={["Mumbai", "Goa", "Pune"]}
                    selected={destination}
                    setSelected={handleDestinationClick}
                />
            </ConfirmContainer>
            <Button onClick={handleConfirmation} fullWidth variant="contained" endIcon={<ArrowForwardIcon />}>
                Continue
            </Button>
        </RootContainer>
    )
}