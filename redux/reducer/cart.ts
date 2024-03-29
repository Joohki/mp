import { IProduct } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
interface ICartState {
  items: IProduct[];
  totalQuantity: number;
  totalAmount: number;
}
const initialState: ICartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
    rePlaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: newItem.quantity,
          totalPrice: newItem.price,
          name: newItem.name,
        });
        state.totalQuantity = state.totalQuantity + newItem.quantity;
        state.totalAmount =
          state.totalAmount + newItem.quantity * newItem.price;
      } else {
        existingItem.quantity = existingItem.quantity + newItem.quantity;
        existingItem.totalPrice =
          existingItem.totalPrice + newItem.price * newItem.quantity;
        state.totalQuantity = state.totalQuantity + newItem.quantity;
        state.totalAmount =
          state.totalAmount + newItem.quantity * newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.totalAmount -= existingItem.price;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },
  },
});

//reducers 내에서 action 의 속성 payload는 정해진 값으로 변할수 없다
export const cartActions = cartSlice.actions;

export default cartSlice;

export const cartReducer = cartSlice.reducer;
