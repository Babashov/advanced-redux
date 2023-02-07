import { createSlice } from "@reduxjs/toolkit";

const ui = createSlice({
    name:'ui',
    initialState:{isCartDisabled:false,notification:null},
    reducers:{

        toggle(state){
            state.isCartDisabled = !state.isCartDisabled
        },

        notification(state,actions){
            state.notification = {
                status:actions.payload.status,
                title:actions.payload.title,
                message:actions.payload.message
            }
        }
        
    }
})

export const uiActions = ui.actions
export default ui;