import {createSlice} from '@reduxjs/toolkit';
import { UserI } from '../../../interfaces';

export interface UserState{
    users: UserI[];
    isModalUserOpen: {active : boolean, type: 'add' | 'edit' | ''};
    activeUserAction: UserI | null;
    loadingUsers: boolean;
}


const initialState:UserState = {
    users: [],
    activeUserAction: null,
    isModalUserOpen: {active: false, type: ''},
    loadingUsers: false
}



export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{
        startLoadingUsers: (state) => {
            state.loadingUsers = true;
            return state;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
            state.loadingUsers = false;
            return state;
        },
        setActiveUserAction: (state, action) => {
            state.activeUserAction = action.payload;
            return state;
        },
        addUser:(state, action) => {
            state.users = [...state.users, action.payload.user];
            return state;
        },
        editUser: (state, action) => {
            state.users = state.users.map((user) => {
                if(user.id === action.payload.user.id){
                    user = action.payload.user;
                    return user;
                }
                return user;
            })
            return state;
        },
        removeUser: (state, action) => {
            state.users = state.users.filter(({id}) => (id !== action.payload.id));
            return state;
        },
        toogleUserModal: (state, action) => {
            state.isModalUserOpen.active = !state.isModalUserOpen.active;
            state.isModalUserOpen.type = action.payload;
            return state;
        }
    }
})

export const {
    setUsers,
    addUser,
    editUser,
    removeUser,
    startLoadingUsers,
    setActiveUserAction,
    toogleUserModal,
} = userSlice.actions;

