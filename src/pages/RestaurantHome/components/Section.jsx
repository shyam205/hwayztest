import { ExpandMore } from "@mui/icons-material";
import { AccordionDetails, AccordionSummary, Typography, styled } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import ProductCard from "./ProductCard";

const CustomAccordion = styled(Accordion)`
    border: none;
    box-shadow: none;
    &:before {
        display: none;
    }
    &:not(:last-child)::after {
        content: " ";
        background: #E7E7E7;
        height: 15px;
        width: 100%;
        display: block;
    }
`

export default function Section({ section,titles,value, ...props }) {
    const { title, items } = section
    
    return (
        <CustomAccordion {...props} disableGutters>
            <AccordionSummary id={`${title}-header`} sx={{ px: 10 }} expandIcon={<ExpandMore />}>
                <Typography variant="heading5Medium" fontFamily='poppins'>{titles} </Typography><Typography variant="paragraphMedium" ml={2} color="white" justifyContent="center" width={24} height={24} borderRadius="50%" bgcolor="primary.main" as="span" sx={{ display:'flex',justifyContent:'center',alignItems:'center',marginLeft:'10px',fontFamily:'poppins' }}>{section.length}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 10,mb:'77px' }}>
            {/* {Object.entries(sections)?.map(item => <ProductCard key={item[0]} itemname={item[0]} item={item[1]} />)} */}
                {section?.map((item,i) => <ProductCard key={i} item={item} value={value} />)}
            </AccordionDetails>
        </CustomAccordion>
    )
}