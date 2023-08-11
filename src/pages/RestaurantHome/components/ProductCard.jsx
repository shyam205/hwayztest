import { Box, Rating, Typography, styled, Button } from "@mui/material";
import ProductCounter from "@/components/ProductCounter";
import { useEffect, useRef, useState } from "react";
import images from "@/utilities/images";
import useCustomer from "@/state/customer";

const Image = styled("img")`
    object-fit: cover;
    width: 120px;
    height: 117px;
    border: 1px solid #E7E7E7;
    border-radius: 8px;
`

const Root = styled(Box)`
    display: flex;
    align-items: center;
    margin-bottom: 25px;
`

export default function ProductCard({ item,value }) {
    // const { name, rating, price, image, id } = item
    const { searchdish } = useCustomer(state => state)
    const { item_name, rating, item_price, image, id, description,new_image_url,review_count } = item
    const z = []
    //console.log("item ",item)
    //   console.log("iyem ",item);
    //   z.push(item)
    //   console.log("z ",z)
    //  var y = z.filter(x =>x.item_name.toLowerCase() == value.toLowerCase());
    //  console.log("y ",y)
    const nodeRef = useRef()
    const [rootContentNode, setRootContentNode] = useState()
   
    useEffect(() => {
        if (!rootContentNode) {
            setRootContentNode(nodeRef.current)
        }
    }, [])

    return (
        <Box ref={nodeRef}>
            <Root>
                <Box display="flex" flexDirection="column" alignItems="flex-start" flex="1">
                    <Typography variant="heading6Medium" fontFamily='Poppins' color='#0E0F13'>{item_name}</Typography>
                    <Typography mt={3} variant="heading5Regular" fontFamily='Poppins' color='#0E0F13' >{item_price?.formatMoney()}</Typography>
                    <Box
                        display="flex"
                        alignItems="center"
                    >
                        <Rating
                            max={5}
                            precision={0.5}
                            size="small"
                            value={rating}
                            sx={{ my: 3 }}
                            readOnly
                        />
                        <Typography variant="paragraphMedium" fontFamily='Poppins' ml='9.9px'><Typography variant="paragraphMedium" color="warning.main" as="span">{rating}</Typography> ({review_count})</Typography>
                    </Box>
                    <Typography variant="smallRegular" color="mainGray.main" fontFamily='Poppins'>{description}</Typography>
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    position="relative"
                    sx={{ height:'117px',width:'120px' }}
                >
                    <Image loading="lazy" src={new_image_url || images.STORE_IMAGE} alt="Product" />
                    <ProductCounter
                        containerRef={rootContentNode}
                        product={item}
                    />
                </Box>
            </Root>
        </Box>
    )
}