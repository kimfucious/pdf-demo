import { configureStore } from "@reduxjs/toolkit";
// import { composeWithDevTools } from 'redux-devtools-extension'
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import logger from "redux-logger";
import auth from "../reducers/authReducer"

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const composeEnhancers =
//   (window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose) || compose;

const store = configureStore({
  reducer: {
    auth,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
