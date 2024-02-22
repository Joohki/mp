import { createSlice } from "@reduxjs/toolkit";
import { IOrder } from "@/types";
import { RootState } from "../store";
interface IOrderState {
  orderHistory: IOrder[];
  totalOrderAmount: null | number;
}

const initialState: IOrderState = {
  orderHistory: [],
  totalOrderAmount: null,
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    storeOrders(state, action) {
      state.orderHistory = action.payload.map((item) => ({
        ...item,
        createdAt: null,//redux에 timeStamp가 직렬화가 안되어 비워두고 저장
      }));
    },
    calculateTotalOrderAmount(state) {
      const array: number[] = [];
      state.orderHistory.map((item) => {
        const { orderAmount } = item;
        return array.push(orderAmount);
      });
      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.totalOrderAmount = totalAmount;
    },
  },
});
export default orderSlice;
export const orderReducer = orderSlice.reducer;
export const orderActions = orderSlice.actions;
export const orderHistory = (state: RootState) => state.order.orderHistory;
export const totalOrderAmount = (state: RootState) => state.order.totalOrderAmount;
