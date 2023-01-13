import { ActionType } from "../types";
import type { AppThunk } from "../store/store";

const DEMO_PASSWORD = process.env.REACT_APP_DEMO_PASSWORD;
const DEMO_USERNAME = process.env.REACT_APP_DEMO_USERNAME;

type Payload = {
    email: string;
    password: string;
    username: string;
};
export const signIn =
    (payload: Payload): AppThunk<Promise<void>> =>
    async (dispatch) => {
        try {
            dispatch({ type: ActionType.SIGN_IN_START });
            const { email, password, username } = payload;
            if (password === DEMO_PASSWORD && username === DEMO_USERNAME) {
                dispatch({
                    type: ActionType.SIGN_IN_SUCCESS,
                    payload: { email, username },
                });
                return Promise.resolve();
            } else {
                throw new Error("Incorrect username or password");
            }
        } catch (error) {
            dispatch({
                type: ActionType.SIGN_IN_FAIL,
                payload: error,
            });
            return Promise.reject(error);
        }
    };

export const signOut = (): AppThunk => async (dispatch) => {
    try {
        dispatch({ type: ActionType.SIGN_OUT_START });
        dispatch({ type: ActionType.SIGN_OUT_SUCCESS });
    } catch (error) {
        dispatch({
            type: ActionType.SIGN_OUT_FAIL,
            payload: error,
        });
    }
};
