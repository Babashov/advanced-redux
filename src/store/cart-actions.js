import { uiActions } from "./ui-slice";
import {cartActions} from './cart-slice'


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

export const fetchData = ()=>{

    return async (dispatch)=>{

          const fetchRequestData = async ()=>{
            const response = await fetch('https://react-shoping-cart-59ef5-default-rtdb.firebaseio.com/cart.json')

            if(!response.ok)
            {
                throw new Error('Fethching cart data failed')
            }

            const data = await response.json()
            return data
          }

          try {
            
            const cartData = await fetchRequestData()
            dispatch(cartActions.replaceItemCart({
                items:cartData.items || [],
                totalQuantity:cartData.totalQuantity
            }))


          } catch (error) {
           
            sendCartData().catch(error=>{
                dispatch(uiActions.notification({
                  status:'error',
                  title:'Error',
                  message:'Fetching cart data failed'
                }))
              })
            
            
          }

    }
}