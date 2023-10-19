import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { userReducer } from "./reducer/user";
import { cartReducer } from "./reducer/cart";
import storage from "redux-persist/lib/storage";
import { persistReducer , persistStore} from "redux-persist";

const rootReducer = combineReducers({ user: userReducer, cart: cartReducer });
const persistConfig = {
  key: "root",
  storage, // 로컬 스토리지에 저장
  //whitelist: ['user'] // 해당 reducer만 저장
  // blacklist: [''] // 해당 reducer만 제외
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: (state, action) => {
    switch (action.type) {
      case HYDRATE:
        return {
          ...state,
          ...action.payload,
        };

      default:
        return persistedReducer(state, action);
    }
  },
  devTools: process.env.NODE_ENV !== "production",
});
export const makeStore = () => {
  return store
};
export const persistor = persistStore(store);
const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
