import React, { useEffect, useState } from 'react'
import { RootContainer } from '../pages.styles'
import Bannerfirst from './components/Banner1'
import Bannersecond from './components/Banner2'
import Bannerthird from './components/Banner3'

function index() {
    
    const [step,setStep] = useState(1)
    useEffect(() => {
      setTimeout(() => {
        setStep(2)
      },2000)
      setTimeout(() => {
        setStep(3)
      },4000)
    
    },[])
  return (
    <RootContainer>
    { step === 1 && (
        <Bannerfirst />
    )}
    { step === 2 && (
        <Bannersecond />
    )}
    { step === 3 && (
        <Bannerthird />
    )} 
      
    </RootContainer>
  )
}

export default index