import { useState, startTransition, useCallback } from 'react'
import { Typography, Accordion, AccordionSummary, AccordionDetails, Button, Box, styled } from "@mui/material";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import Header from "@/components/Header";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { RootContainer } from "../pages.styles";
import { CONTACT_TYPES, CONTACTS, handleContactClick } from '@/utilities/contacts';
import CustomInput from '@/components/CustomInput';
import images from '@/utilities/images';
import SearchInput from './components/SearchInput';

const FAQ_SECTIONS = [
    {
        question: "What is Hwayz?",
        answer: "Hwayz is a technology partners to restaurant and travel operator to enable them provide meal service to their commuters."
    },
    {
        question: "How to pre book meals?",
        answer: "Select your travel routes, we’ll provide you the information of stops along with list of restaurant available at those stops. You can select the restaurant and meals of your choice and make the payment to book you meals."
    },
    {
        question: "When will I get my meals?",
        answer: "Once you reach at the upcoming pitstop, you’ll have to go to the restaurant counter and display the order code, restaurant will serve the food immediately to you."
    },
    {
        question: "What all payment options do I have?",
        answer: "We accept all kind of digital payment methods, such as UPI, Debit Card, Credit Card, Sodexo, Net Banking."
    },
    {
        question: "What if restaurant denies serving the order?",
        answer: "This is a very rare case where restaurant may deny to serve you the meals. In case this is happening, you can reach out to our customer support desk, we’ll help you with the resolution."
    },
    {
        question: "Do I have to pay anything extra on order?",
        answer: "No, you don’t have to pay anything extra if you have made a prepaid booking with us."
    }
]

const SmallIcon = styled("img")(({ theme }) => ({
    margin: `0 ${theme.spacing(2)}`
}))

export default function FAQs() {
    const [search, setSearch] = useState("")
    const [questions, setQuestions] = useState(FAQ_SECTIONS)

    const handleSearch = useCallback(e => {
        const value = e.target.value
        setSearch(value)
        startTransition(() => {
            setQuestions(FAQ_SECTIONS.filter(q => new RegExp(value, "i").test(q.question)))
        })
    }, [setSearch, setQuestions, FAQ_SECTIONS])

    return (
        <RootContainer display="flex" flexDirection="column">
            <Box flexGrow="1">
                <Box px={10}><Header renderRight={null} /></Box>
                <Box px={10}><Typography variant="heading6Medium" sx={{ fontWeight:'Poppins',color:'#0E0F13',lineHeight:'144%' }} mb='13px'>FAQs</Typography></Box>
                {/* <CustomInput
                    sx={theme => ({
                        marginTop: theme.spacing(14),
                        marginBottom: theme.spacing(10)
                    })}
                    startAdornment={<SearchOutlinedIcon />}   
                    placeholder="Search a question"
                    value={search}
                    onChange={handleSearch}
                /> */}
                <Box px={10}><SearchInput /></Box>
                <Box px={10}><Typography variant="heading5Bold" mb={8}>Frequently Asked Questions!</Typography></Box>
                <Box px={10} py='19px' sx={{ backgroundColor:'#fff' }}>
                {questions.map(section => 
                <Accordion disableGutters key={section.question} sx={{ marginBottom:'15px' }}>
                    <AccordionSummary expandIcon={<KeyboardArrowDownIcon fontSize="small" />}>
                        <Typography variant='heading6Medium' sx={{ fontFamily:'Poppins',lineHeight:'20px',color:'#0E0F13' }}>{section.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant='paragraphRegular' sx={{ fontFamily:'Poppins',lineHeight:'20px',color:'#0E0F13' }}>{section.answer}</Typography>
                    </AccordionDetails>
                </Accordion>)}
                </Box>
            </Box>
            <Box px={10} pt={16} pb={14} bgcolor="#F9F9F9">
                <Typography variant="paragraphRegular" sx={{ color: '#939497',fontFamily: 'Poppins',lineHeight: '20px' }}>Have more queries? <SmallIcon src={images.QUERIES_ICON} alt="Queries" /><Typography variant="heading6Medium" sx={{ color:'#0E0F13' ,lineHeight:'20px'}}>Talk to us!</Typography></Typography>
                <Box my={10}>
                    <Typography variant="paragraphRegular" sx={{ color: '#939497',fontFamily: 'Poppins',lineHeight: '20px' }}>Customer support:</Typography>
                    <Button onClick={handleContactClick(CONTACTS.SUPPORT_PHONE, CONTACT_TYPES.PHONE)} variant="text" startIcon={<LocalPhoneOutlinedIcon fontSize="small" />}>
                        <Typography variant="heading6Medium" sx={{ color:'#0E0F13' ,lineHeight:'20px'}}>{CONTACTS.SUPPORT_PHONE}</Typography>
                    </Button>
                </Box>
                <Typography variant="paragraphRegular" sx={{ color: '#939497',fontFamily: 'Poppins',lineHeight: '20px' }}>Write us on:</Typography>
                <Button onClick={handleContactClick(CONTACTS.SUPPORT_EMAIL, CONTACT_TYPES.EMAIL)} variant="text" startIcon={<EmailOutlinedIcon fontSize="small" />}>
                    <Typography variant="heading6Medium" sx={{ color:'#0E0F13' ,lineHeight:'20px'}}>{CONTACTS.SUPPORT_EMAIL}</Typography>
                </Button>
            </Box>
        </RootContainer>
    )
}