import React from 'react'
import ProductCounter from "@/components/ProductCounter";
import { Box, Rating, Typography, styled, Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import images from "@/utilities/images";

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

function FilterProduct({section}) {
    // console.log("section",section)
    const { item_name, rating, item_price, image, id, description,new_image_url,review_count } = section;
    const nodeRef = useRef()
    const [rootContentNode, setRootContentNode] = useState()

    useEffect(() => {
        if (!rootContentNode) {
            setRootContentNode(nodeRef.current)
        }
    }, [])

  return (
    <Box px='20px' ref={nodeRef}>
            <Root>
                <Box display="flex" flexDirection="column" alignItems="flex-start" flex="1">
                    {!!item_name && <Typography variant="heading6Regular">{item_name}</Typography>}
                    {!!item_price && <Typography mt={3} variant="heading5Regular">{item_price?.formatMoney()}</Typography> }
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
                        <Typography variant="paragraphMedium"><Typography variant="paragraphMedium" color="warning.main" as="span">{rating}</Typography> ({review_count})</Typography>
                    </Box>
                    <Typography variant="smallMedium" color="mainGray.main">{description}</Typography>
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
                        product={section}
                    />
                </Box>
            </Root>
        </Box>
  )
}

export default FilterProduct