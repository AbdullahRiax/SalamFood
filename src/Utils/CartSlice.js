
import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",

  initialState: {
    items: [],
  },

  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },

    removeFromCart: (state, action) => {
      const id = action.payload?.card?.info?.id;
      state.items = state.items.filter((item) => item?.card?.info?.id !== id);
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
} = CartSlice.actions;

export default CartSlice.reducer;

