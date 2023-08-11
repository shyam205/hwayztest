import { getWrapper,postWrapper, returnOrThrow } from "./wrappers"
import { 
        FETCH_ROUTE_AND_DETAIL,
        GET_STORES_LIST,
        FETCH_RESTAURANTS_AND_STOPS,
        FETCH_RESTAURANTS_DETAILS,
        FETCH_ADD_TO_CART,
        CREATE_USER,
        FETCH_USER_OTP,
        FETCH_RESTAURANTS,
        RESTAURANT_BASE,
        FETCH_CREATE_ORDER,
        FETCH_ORDER_DETAIL,
        FETCH_CUSTOMER_ORDER_DETAIL,
        FETCH_CANCEL_ORDER, 
        FETCH_PAYMENT_INFO
     } from "./endpoints"

import useCustomer from "@/state/customer"



export const getStoresList = async (location, page = 0, limit = 10) => {
    const resJSON = await getWrapper(`${GET_STORES_LIST}?page=${page}&limit=${limit}`)
    const result = await returnOrThrow(resJSON)
    return result?.posts
}

export const createOrder = async (data) => {
    console.log("data ",data)
    const resJSON = await postWrapper(`${FETCH_CREATE_ORDER}`,data,{ "Content-Type": "application/json"})
    const result = await returnOrThrow(resJSON)
    return result
}

export const createuser = async (userdetail) => {
    const resJSON = await postWrapper(`${CREATE_USER}`,userdetail,{ "Content-Type": "application/json"})
    const result = await returnOrThrow(resJSON)
    return result
}
export const getOtpforCustomer = async (userdetail) => {
    const customerid = userdetail?.customerId
    // delete userdetail.customerId
    const resJSON = await getWrapper(`${FETCH_USER_OTP}customer/${customerid}/mobile/otp/send`,userdetail)
    const result = await returnOrThrow(resJSON)
    return result
}

export const userOtpVerification = async (userdetail) => {
    const customerid = userdetail?.customer_id
    // delete userdetail.customer_id
    const resJSON = await postWrapper(`${FETCH_USER_OTP}customer/${customerid}/mobile/otp/verification`,userdetail,{ "Content-Type": "application/json"})
    const result = await returnOrThrow(resJSON)
    return result
}

export const fetchRoutedetail = async qrID => {
    const resJSON = await getWrapper(`${FETCH_ROUTE_AND_DETAIL}/${qrID}/details`)
    const result = await returnOrThrow(resJSON)
    // console.log("result ",result)
    return result
}

export const fetchRestaurantandstops = async (travel_partner_id,vehicle_id,primary_route_id) => {
   
    const resJSON = await getWrapper(`${FETCH_RESTAURANTS_AND_STOPS}/${travel_partner_id}/vehicle/${vehicle_id}/route/${primary_route_id}/details`)
    // console.log("resJSON",resJSON)
    const result = await returnOrThrow(resJSON)
    return result
}

export const getOrderDetail = async (ordernumber) => {
    console.log("ordernumber ",ordernumber)
    const resJSON = await getWrapper(`${FETCH_ORDER_DETAIL}/${ordernumber}/get`)
    const result = await returnOrThrow(resJSON)
    return result
}
export const getRestaurants = async qrID => {
    const resJSON = await getWrapper(`${FETCH_RESTAURANTS}/${qrID}/details`)
    const result = await returnOrThrow(resJSON)
    return result
}

export const getOrderdetail = async (orderId) => {
    const resJSON = await getWrapper(`${FETCH_CUSTOMER_ORDER_DETAIL}order/external/${orderId}/get`)
    const result = await returnOrThrow(resJSON)
    return result
}
export const getMenuItemsForRestaurant = async (travel_partner_id,vehicle_id,primary_route_id,restaurant_id) => {
    const resJSON = await getWrapper(`${FETCH_RESTAURANTS_DETAILS}/${travel_partner_id}/vehicle/${vehicle_id}/route/${primary_route_id}/supply/${restaurant_id}`)
    const result = await returnOrThrow(resJSON)
    return result
}

// export const getMenuItemsForRestaurant = async restaurantID => {
//     const resJSON = await getWrapper(`${RESTAURANT_BASE}/${restaurantID}/menu/item/list`)
//     const result = await returnOrThrow(resJSON)
//     return result
// }

export const AddToCartItem = async (data) => {
    const restaurantId = data.params
    // delete data.params
    const resJSON = await postWrapper(`${FETCH_ADD_TO_CART}order/external/restaurant/${restaurantId}/cart/item/update`,data,{ "Content-Type": "application/json"})
    const result = await returnOrThrow(resJSON)
    return result
}

export const cancelAllorderItem = async (data) => {
    const resJSON = await getWrapper(`${FETCH_CANCEL_ORDER}order/external/restaurant/${data.restaurantId}/order/${data.orderId}/cancel`)
    const result = await returnOrThrow(resJSON)
    return result
}

export const getInfoPayment = async (data) => {
    // let data = {
    //     body: JSON.stringify({
    //         "order_id": orderid,
    //         "amount": payamount,
    //         'customer_id': customer_id,
    //         "customer_phone": customer_phone,
    //         'first_name': first_name,
    //         'last_name': last_name
    //     }),
    //     redirect: 'follow',
    // }
    console.log("data ",data)
    const resJSON = await postWrapper(`${FETCH_PAYMENT_INFO}`,data,{ "Content-Type": "application/json"})
    const result = await returnOrThrow(resJSON)
    return result
}