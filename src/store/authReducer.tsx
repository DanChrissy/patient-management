import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
    token: string,
    user: { [x:string]: any }
}
const DEFAULT_STATE : AuthState = {
    token: '',
    user: {}
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: DEFAULT_STATE,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        resetUser: () => {
            return DEFAULT_STATE
        }
    }
})

export const isAuthenticated = ({auth: state}:  any | AuthState) => {
    if ((Object.keys(state?.user || {}) || []).length > 0) {
        return true;
    }
    return false;
}

export const getToken = ({auth: state}: any | AuthState) => state.token;
export const getUser = ({auth: state} : any | AuthState) => state.user;

export const { setToken, setUser, resetUser } = authSlice.actions;

export default authSlice.reducer;