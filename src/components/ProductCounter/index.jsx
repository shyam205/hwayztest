import { TransitionGroup } from "react-transition-group";
import { Box, Button, Collapse, Stack, Typography, styled } from "@mui/material";
import { shallow } from 'zustand/shallow'
import useStoreSelection from "@/state/selection";
import RecommendedItem from "@/pages/RestaurantHome/components/RecommendedItem";
import { createPortal } from "react-dom";
import { useMutation } from '@tanstack/react-query';
import { AddToCartItem } from "@/api/stores";
import useCustomer from "@/state/customer";

const Root = styled(Box)(({ isabsolute, theme }) => ({
    width: 80,
    height: 30,
    background: "linear-gradient(white, white), linear-gradient(#FD5001, #F01F24)",
    borderRadius: 25,
    border: "double 1px transparent",
    borderStyle: "solid",
    backgroundOrigin: "border-box",
    backgroundClip: "content-box, border-box",
    ...(isabsolute? {
        position: "absolute",
        bottom: 0,
        transform: "translateY(50%)",
    }: {}),
    overflow: "hidden"
}))

const AddButton = styled(Button)`
    color: ${({ theme }) => theme.palette.primary.main};
    flex: 1;
    min-width: 0;
    height: 100%;
    font-size: 14px;
`

const RecommendationContainer = styled(Box)(({ theme }) => ({
    borderTop: `1px solid rgba(147, 148, 151, .3)`,
    borderBottom: `1px solid rgba(147, 148, 151, .3)`,
    padding: `${theme.spacing(8)} 0`,
    marginBottom: theme.spacing(6)
}))

export default function ProductCounter({ product, isabsolute = true, containerRef, ...props }) {
    const { incrementItem:addItem,decrementItem:removeItem,setCartItems,items_poid,setUniquepoid,unique_poid } = useStoreSelection(state => state)
    const { setUpdateCart } = useCustomer(state => state)
    const state = useCustomer(state => state);
    //console.log("product ",product)
    let currentproductid;
    const { mutate:addItemToCart, mutateAsync, isLoading, isError, error } = useMutation(AddToCartItem,{
        onSuccess: (response) => {
            console.log('added item:', response);
            
            addItem({...product, po_id:response.data.id})
            !!unique_poid === false && setUniquepoid(response.data.id )
            setCartItems(product)
            setUpdateCart(response.data)
            // Handle the data when the mutation is successful
          },
    });

    const { mutate:removeItemToCart} = useMutation(AddToCartItem,{
        onSuccess: (response) => {
            // console.log('added item:', response);
            removeItem(product.id)
            setUpdateCart(response.data)
            // Handle the data when the mutation is successful
          },
    });

    const { mutate:addMoreItemToCart} = useMutation(AddToCartItem,{
        onSuccess: (response) => {
            // console.log('added item:', response);
            addItem(product)
            setUpdateCart(response.data)
            // Handle the data when the mutation is successful
          },
    });

    const addToCart = () => {
      let data = {
        body: JSON.stringify(
            !!unique_poid ? {
            "supply_id": product.supply_id,
            "vehicle_id": state.vehicle_id,
            "route_id": state.primary_route_id,
            "item_id": product.id,
            "po_id": unique_poid,
            "item_price": product.item_price,
            "item_quantity": 1
        }:
        {
            "supply_id": product.supply_id,
            "vehicle_id": state.vehicle_id,
            "route_id": state.primary_route_id,
            "item_id": product.id,
            "item_price": product.item_price,
            "item_quantity": 1  
        }
        ),
        redirect: 'follow',
        params: state.restaurantdetail.id
    }
    addItemToCart(data)
    }

    const addMoreItem = () => {
        console.log("product ",product);
        let data = {
          body: JSON.stringify({
              "supply_id": product.supply_id,
              "vehicle_id": state.vehicle_id,
              "route_id": state.primary_route_id,
              "po_id": unique_poid,
              "item_id": product.id,
              "item_price": product.item_price,
              "item_quantity": 1
          }),
          redirect: 'follow',
          params: state.restaurantdetail.id
      }
      addMoreItemToCart(data)
      }

    const removeCart = () => {
        let data = {
          body: JSON.stringify({
              "supply_id": product.supply_id,
              "vehicle_id": state.vehicle_id,
              "route_id": state.primary_route_id,
              "po_id": unique_poid,
              "item_id": product.id,
              "item_price": product.item_price,
              "item_quantity": -1
          }),
          redirect: 'follow',
          params: state.restaurantdetail.id
      }
      removeItemToCart(data)
      }

    
    const qty = useStoreSelection(state => state.items?.find(el => el.id === product?.id)?.qty, shallow)
    // console.log("qty ",qty)
    return (
        <Root isabsolute={isabsolute} {...props}>
            {!qty?
            <AddButton fullWidth onClick={addToCart}>Add</AddButton>:
            // <AddButton fullWidth onClick={() => addItem(product)}>Add</AddButton>:
            <Box
                width="100%"
                height="100%"
                display="flex"
                alignItems="center"
            >
                 <AddButton onClick={removeCart}>-</AddButton>
                {/* <AddButton onClick={() => removeItem(product.id)}>-</AddButton> */}
                <Box>
                    <Typography variant="paragraphMedium" sx={{ color: '#F32C1B' }} >{qty}</Typography>
                </Box>
                <AddButton onClick={addMoreItem}>+</AddButton>
                {/* <AddButton onClick={() => addItem(product)}>+</AddButton> */}
            </Box>}
            {/* {!!containerRef && 
            createPortal(
                <>
                    <TransitionGroup>
                        <Collapse key={qty > 0}>
                            {qty > 0 && 
                            <RecommendationContainer>
                                <Typography color="mainGray.main" variant="paragraphRegular" mb={3}>Best paired with</Typography>
                                <Stack direction="row" columnGap={8}>
                                    <RecommendedItem />
                                    <RecommendedItem />
                                </Stack>
                            </RecommendationContainer>}
                        </Collapse>
                    </TransitionGroup>
                </>,
                containerRef
            )} */}
        </Root>
    )
}