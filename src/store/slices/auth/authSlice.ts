import {createSlice} from '@reduxjs/toolkit';
import {  UserI } from '../../../interfaces';

export interface UserState{
    user: UserI | null;
    token: string;
}


const initialState:UserState = {
    user: null,
    token: ''
}



export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        startLogin: (state, action) => {
            state.token = action.payload;
            return state;
        },
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            return state;
        },
        logout: (state) => {
            state.user = null;
            state.token = "";
            return state;
        }

    }
})

export const {
    startLogin,
    setUser,
    logout
} = authSlice.actions;