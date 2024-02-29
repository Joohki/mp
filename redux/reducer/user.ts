import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import { RootState } from "../store";
interface UserState {
  email: string | null;
}

const initialState: UserState = {
  email: null,
  // name: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      // state.name = action.payload.name;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export default userSlice;
export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
export const reduxUserEmail = (state:RootState)=>state.user.email