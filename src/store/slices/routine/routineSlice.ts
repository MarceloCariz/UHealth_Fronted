import {createSlice} from '@reduxjs/toolkit';
import { RoutineResponseI } from '../../../interfaces';

export interface RoutineState{
    routines: RoutineResponseI[];
}


const initialState:RoutineState = {
    routines: [],
}



export const routineSlice = createSlice({
    name: 'routine',
    initialState,
    reducers:{
        setRoutinesByUser: (state, action) => {
            state.routines = action.payload;
            return state
        },
        removeRoutineById: (state, action) => {
            state.routines = state.routines.filter((routine) => (routine.id !== action.payload));
            return state;
        }
    }
})

export const {
    setRoutinesByUser,
    removeRoutineById
} = routineSlice.actions;