import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartSlice";
import OrderReducer from "./OrderSlice";

const Appstore = configureStore({
  reducer: {
    cartd: CartReducer,
    order: OrderReducer,
  },
});

export default Appstore;