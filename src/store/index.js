import { configureStore } from "@reduxjs/toolkit";
import ui from "./ui-slice";
import cartSlice from "./cart-slice";

const store = configureStore({
    reducer:{ui:ui.reducer,cart:cartSlice.reducer}
})

export default store