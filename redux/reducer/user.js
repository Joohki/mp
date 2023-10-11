import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: null,
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.email = action.payload;
        },
    },
});
export default userSlice;
export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;