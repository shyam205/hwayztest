import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStoreSelection = create(persist(set => ({
    storeName: "",
    storeID: "",
    items: [],
    cartitems : [],
    items_poid : {},
    unique_poid:'',
    
    setCartItems: async newitem => set(state=>({
        cartitems : newitem.length === 0 ? [] : [newitem, ...state.cartitems] ,
        
    })),
    setItems: async items => set(state => ({
        items: items.length === 0 && []
    })),
    setUniquepoid: (unique_poid) => set({unique_poid}),
    incrementItem: async item => {
        //  console.log("item ",item)
        set(state => ({
            items: state.items?.find(i => i.id === item.id)?
                state.items.map(it => it.id === item.id? { ...it, qty: it.qty+1 }: it ):
                (
                    state.items.concat({ ...item, qty: 1 })
                ),
                
        }))
        //     items:
        //     state.items?.find((i) => i.id === item.id)
        //       ? state.items.map((it) =>
        //           it.id === item.id ? { ...it, qty: it.qty + 1 } : it
        //         )
        //       : (() => {
        //           const newItem = { ...item, qty: 1 };
        //           if (item.po_id) {
        //             state.items_poid[`${item.id}`] = item.po_id;
        //           }
        //           return [...state.items, newItem];
        //         })()
          
        // }))
        
    },
    decrementItem: async itemID => {
        set(state => {
            const newItems = state.items.reduce((acc, item) => {
                const currItem = { ...item }
                if (item.id === itemID) {
                    if (currItem.qty === 1) {
                        delete state.items_poid[itemID]
                        return acc
                    }
                    currItem.qty -= 1
                }
                acc.push(currItem)
                return acc
            }, [])
            return { items: newItems }
        })
    },
    resetState: () => set({}, true)
}), {
    name: "storeSelections",
    version: 1,
}))

export default useStoreSelection