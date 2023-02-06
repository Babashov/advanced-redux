import { createSlice } from "@reduxjs/toolkit";

const ui = createSlice({
    name:'ui',
    initialState:{isCartDisabled:false},
    reducers:{

        toggle(state){
            state.isCartDisabled = !state.isCartDisabled
        }
        
    }
})

export const uiActions = ui.actions
export default ui;