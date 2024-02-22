import {
  configureStore,
  combineReducers,
  AnyAction,
  Store,
} from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { userReducer } from "./reducer/user";
import { cartReducer } from "./reducer/cart";
import { orderReducer } from "./reducer/order";
import { filterReducer } from "./reducer/filter";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { productReducer } from "./reducer/product";

// export interface RootState {
//   user: UserState;
//   cart: CartState;
//   order: OrderState;
// }
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  order: orderReducer,
  filter: filterReducer,
  product: productReducer,
});
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  // 로컬 스토리지에 저장
  //whitelist: ['user'] // 해당 reducer만 저장
  blacklist: ["order", "filter", "product"], // 해당 reducer만 제외
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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const makeStore = () => {
  return store;
};

export const persistor = persistStore(store);

const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
export type RootState = ReturnType<typeof store.getState>;
