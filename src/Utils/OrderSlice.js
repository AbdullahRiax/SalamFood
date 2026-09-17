import { createSlice } from "@reduxjs/toolkit";

const OrderSlice = createSlice({
  name: "order",
  initialState: {
    lastOrder: null,
  },
  reducers: {
    placeOrder: (state, action) => {
      state.lastOrder = {
        ...action.payload,
        status: action.payload.status || "placed",
      };
    },
    cancelOrder: (state) => {
      if (state.lastOrder) {
        state.lastOrder.status = "cancelled";
        state.lastOrder.cancelledAt = new Date().toISOString();
      }
    },
  },
});

export const { placeOrder, cancelOrder } = OrderSlice.actions;
export default OrderSlice.reducer;
