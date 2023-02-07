import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        items:[],
        totalQuantity:0
    },
    reducers:{
        addItemToCart(state,action){
            const newItem = action.payload
            const exsistingItem = state.items.find(item=>item.id === newItem.id)
            state.totalQuantity++

            if(!exsistingItem)
            {
                state.items.push({
                    id:newItem.id,
                    price:newItem.price,
                    quantity:1,
                    totalPrice:newItem.price,
                    name:newItem.title,


                })
            }else{
                exsistingItem.quantity++
                exsistingItem.totalPrice += newItem.price
            }
        },

        removeItemFromCard(state,action){
            const id = action.payload

            const exsistingItem = state.items.find(item=>item.id === id)
            state.totalQuantity--
            if(exsistingItem.quantity === 1)
            {
                state.items = state.items.filter(item=>item.id !== id)
            }else{
                exsistingItem.quantity--
                exsistingItem.totalPrice -= exsistingItem.price
            }
        },
    }
})

export const sendCartData = (cart)=>{
    return async (dispatch)=>{

        dispatch(uiActions.notification({
            status:'pending',
            title:'Sending...',
            message:'Sending cart data'
          }))

          const sendRequestData = async ()=>{
            const response = await fetch('https://react-shoping-cart-59ef5-default-rtdb.firebaseio.com/cart.json',{
                method:'PUT',
                body:JSON.stringify(cart)
            })

            if(!response.ok)
            {
                throw new Error('Sending cart data failed')
            }
          }

          try {
            await sendRequestData()
            dispatch(uiActions.notification({
                status:'success',
                title:'Success',
                message:'Sent cart data successfully'
              }))
          } catch (error) {

            sendCartData().catch(error=>{
                dispatch(uiActions.notification({
                  status:'error',
                  title:'Error',
                  message:'Sending cart data failed'
                }))
              })
              
          }

          
    }
}

export const cartActions = cartSlice.actions
export default cartSlice