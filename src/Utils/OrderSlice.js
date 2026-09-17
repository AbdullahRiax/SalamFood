import { createSlice } from "@reduxjs/toolkit";

const OrderSlice = createSlice({
  name: "order",
  initialState: {
    lastOrder: null,
  },
  reducers: {
    placeOrder: (state, action) => {
      state.lastOrder = action.payload;
    },
  },
});

export const { placeOrder } = OrderSlice.actions;
export default OrderSlice.reducer;
