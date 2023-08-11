import { fetchRoutedetail } from '@/api/stores'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCustomer = create(persist(set => ({
    bearerToken: "",
    coordinates: {},
    customerName: "",
    whatsappNo: "",
    routeId: "",
    source:'',
    destination:'',
    travel_partner_id: '',
    vehicle_id: '',
    primary_route_id: '',
    restaurant_list: [],
    upcoming_stop_list: [],
    route_list: [],
    customerOrderDetail:[],
    supply_id: '',
    po_id: '',
    item_id: '',
    item_price: '',
    item_quantity: '',
    restaurantdetail: {},
    customerdetail:[],
    create_order: [],
    tradename: '',
    activestop: '',
    activestopId: '',
    order_status: '',
    order_status_heading: '',
    order_status_subheading: '',
    stop_id_to_restaurant_id:{},
    searchdish: '',
    updatecart:[],
    paymentredirect:[],
    etarestaurant:'',
    dynamicorder: [],
    setSourceDestination: (source, destination,travel_partner_id,vehicle_id,primary_route_id,route_list) => set({source, destination,travel_partner_id,vehicle_id,primary_route_id,route_list}),
    setVehicledetails : (travel_partner_id,vehicle_id,primary_route_id) => (travel_partner_id,vehicle_id,primary_route_id),
    setRouteDetails: (routeId, coordinates) => set({ routeId, coordinates }),
    setRestaurants: (restaurant_list,upcoming_stop_list) => set({restaurant_list,upcoming_stop_list}),
    setTradename: (tradename) => set({tradename}),
    setRestaurantDetail: (restaurantdetail) => set({restaurantdetail}),
    setBearerToken: token => set({ bearerToken: token }),
    // setCustomerDetails: (customerName, whatsappNo) => set({ customerName, whatsappNo }),
    setCustomerOrderdeatil:(customerOrderDetail) => set({customerOrderDetail}),
    setCustomerDetails: (customerdetail) => set({ customerdetail }),
    setCreateOrder: (create_order) => set({ create_order }),
    setActivestop: (activestop,activestopId) => set({ activestop,activestopId }),
    setOrderheadingdesc: (order_status,order_status_heading,order_status_subheading) => set({order_status,order_status_heading,order_status_subheading}),
    setStopIdRestaurantId : (stop_id_to_restaurant_id) => set({stop_id_to_restaurant_id}),
    setSearchDish : (searchdish) => set({ searchdish }),
    setUpdateCart : (updatecart) => set({updatecart}),
    setPaymentRedirect: (paymentredirect) => set({ paymentredirect }),
    setEtaRestaurant : (etarestaurant) => set({ etarestaurant }),
    setDynamicOrder: async neworder => {
        set(state => ({
            
            dynamicorder : state.dynamicorder?.find((item) => Object.keys(item) == neworder.order_details.order_number) ?
            state.dynamicorder
            : state.dynamicorder.concat({ [neworder.order_details.order_number]: neworder })  
          
        }))
    }
        
 }), {
    name: "customerDetails",
    version: 1
}))

export default useCustomer