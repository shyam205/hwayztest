import { useState, useEffect } from 'react'

const GEOLOCATION_OPTIONS = {
    enableHighAccuracy: true,
}

export const GEOLOCATION_ERROR = {
    DENIED: GeolocationPositionError.PERMISSION_DENIED,
    UNAVAILABLE: GeolocationPositionError.POSITION_UNAVAILABLE,
    TIMEOUT: GeolocationPositionError.TIMEOUT
}

export const GEOLOCATION_MESSAGES = {
    [GEOLOCATION_ERROR.DENIED]: "Permission has been denied. Please go to settings and allow Hwayz permission to location",
    [GEOLOCATION_ERROR.UNAVAILABLE]: "Location services not available. Please try after sometime or with a different device",
    [GEOLOCATION_ERROR.TIMEOUT]: "Location services timed out! Please try again in sometime"
}

export function useGeolocation() {
    const [position, setPosition] = useState({})
    const [error, setError] = useState(null)
    const [locationSettled, setLocationSettled] = useState(false)

    useEffect(() => {
        getCurrentLocation()
    }, [])

    const getCurrentLocation = async () => {
        if (navigator.geolocation?.getCurrentPosition) {
            setLocationSettled(false)
            navigator.geolocation.getCurrentPosition(position => {
                setError(prev => !!prev? null: prev)
                setPosition(position.coords)
                setLocationSettled(true)
            }, err => {
                setError(err.code)
                setLocationSettled(true)
            }, GEOLOCATION_OPTIONS)
        }
        else {
            setError(GEOLOCATION_ERROR.UNAVAILABLE)
        }
    }
    return { position, error, getCurrentLocation, locationSettled }
}

export function useLiveGeolocation() {
    const [position, setPosition] = useState({})
    const [error, setError] = useState(null)

    useEffect(() => {
        let watchID
        if (navigator.geolocation?.watchPosition) {
            watchID = navigator.geolocation.watchPosition(result => {
                setError(prev => !!prev? null: prev)
                setPosition(result.coords)
            }, err => {
                setError(err.code)
            }, GEOLOCATION_OPTIONS)
        }
        else {
            setError(GEOLOCATION_ERROR.UNAVAILABLE)
        }
        return () => {
            if (watchID) {
                navigator.geolocation.clearWatch(watchID)
            }
        }
    }, [])

    return { position, error }
}