import { createAction, createReducer } from "@reduxjs/toolkit";
import { ActionType, AuthUser } from "../types";

// interface Auth {
//   authUser: Record<string, any>
// }

const initialState = {
    username: "",
    email: "",
} as AuthUser;

const signIn = createAction<AuthUser>(ActionType.SIGN_IN_SUCCESS);
const signOut = createAction<null>(ActionType.SIGN_OUT_SUCCESS);
const reducer = createReducer({ ...initialState }, (builder) => {
    builder
        .addCase(signIn, (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        })
        .addCase(signOut, (state) => {
            return { ...state, username: "", email: "" };
        });
});

export default reducer;
