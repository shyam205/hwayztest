import { useState } from "react";
import { useParams } from "react-router-dom";
import { styled, Typography,Box } from "@mui/material";
import { RootContainer } from "../pages.styles";
import RestaurantHeader from "./components/RestaurantHeader";
import SearchInput from './components/SearchInput';
import SelectionPayment from "./components/SelectionPayment";
import Section from "./components/Section";
import images from "@/utilities/images";
import ProductLoader from "./loaders/ProductLoader";
import { useInfiniteQuery } from "@tanstack/react-query";
import useCustomer from "@/state/customer";
import { getMenuItemsForRestaurant } from "@/api/stores";
import FilterProduct from "./components/FilterProduct";


const MenuAdornment = styled(Typography)`
    position: relative;
    text-align: center;
    display: flex;
    justify-content: center;
    margin-bottom: ${({ theme }) => theme.spacing(8)};
    margin-top: ${({ theme }) => theme.spacing(45)};
    & > * {
        padding: 0 10px;
        z-index: 2;
    }
    &::before {
        width: 40px;
        height: 1px;
        background: ${({ theme }) => theme.palette.mainGray.main};
        content: " ";
        position: absolute;
        top: 50%;
        transform: translateX(-55px);
    }
    &::after {
        width: 40px;
        height: 1px;
        background: ${({ theme }) => theme.palette.mainGray.main};
        content: " ";
        position: absolute;
        top: 50%;
        transform: translateX(55px);
    }
`

export default function RestaurantHome() {
    const { storeID } = useParams()
    //console.log("storeID ",storeID)
    // const [list, setList] = useState(DATA)
    const [filteredItems,setFilteredItems] = useState()
    const [search, setSearch] = useState("")
    const [valueItem,setValueitem] = useState('')

    const {travel_partner_id,vehicle_id,primary_route_id,setRestaurantDetail,restaurantdetail} = useCustomer(state => state)
    
    const { data, fetchNextPage, hasNextPage, isFetching, isLoading } = useInfiniteQuery({
        queryKey: [`restaurant-detail`],
        queryFn: ({ pages }) => getMenuItemsForRestaurant(travel_partner_id,vehicle_id,primary_route_id,storeID),
        onSuccess: (response) => {
                //console.log("response ",response)
                const supply_id = response?.pages[0]?.data?.id;
                setRestaurantDetail(response?.pages[0]?.data)
        },
      })
      const store = {
        "trade_name" : restaurantdetail?.trade_name,
        'non_veg_available': restaurantdetail?.non_veg_available,
        'rating' : restaurantdetail?.rating,
        'review_count': restaurantdetail?.review_count,
        "amenity_list" : restaurantdetail.amenity_list,
        "amount_estimation" : restaurantdetail.amount_estimation,
        "image_list" : restaurantdetail.image_list
      }

      let restaurantdetailkeys = restaurantdetail && restaurantdetail.menu_list && Object.keys(restaurantdetail).length >0 && Object.keys(restaurantdetail.menu_list);
      const handleSearch = (val) => {
        setValueitem(val)
        let filtereddish  = [];
        restaurantdetailkeys.map((item) => 
        restaurantdetail?.menu_list[item]
        .filter((x) =>  x.item_name.toLowerCase().includes(val.toLowerCase()) ? filtereddish.push(x) : null)
        )
        //console.log("filtereddish",filtereddish)
        // var arrObjectItems =  filtereddish.map((x) => x.length > 0 && x[0]).filter((item) => item !== false)
        setFilteredItems(filtereddish)
      }

        // console.log("filteredItems ",filteredItems)
    return (
        <RootContainer>
            { Object.keys(restaurantdetail).length > 0 && <RestaurantHeader store={store} /> }
            <MenuAdornment>
                <Typography color="mainGray.main" variant="paragraphMedium" fontFamily='Poppins'>Menu</Typography>
            </MenuAdornment>
            <SearchInput
                value={search}
                setValue={setSearch}
                searchvalue={(val) => handleSearch(val)}
            />
            { valueItem.length > 0 ? 
            
            (filteredItems.length > 0 ? 
            filteredItems.map((section,i) => 
              <FilterProduct
              section={section}
              key={i}
              />
            )
            : 
            <Box>
                <Typography px='20px'>Not Found</Typography>
            </Box>
            )
            : 
            Object.keys(restaurantdetail).length > 0 && restaurantdetail?.menu_list &&
                Object.entries(restaurantdetail.menu_list).map((section,i) => 
                <Section
                    defaultExpanded
                    key={i}
                    titles={section[0]}
                    section={section[1]}
                    value={search}
                />)
            }
            {/* {Object.keys(restaurantdetail).length > 0 && restaurantdetail?.menu_list &&
                Object.entries(restaurantdetail.menu_list).map((section,i) => 
                <Section
                    defaultExpanded
                    key={i}
                    titles={section[0]}
                    section={section[1]}
                    value={search}
                />)
            } */}
            <SelectionPayment />
        </RootContainer>
    )
}