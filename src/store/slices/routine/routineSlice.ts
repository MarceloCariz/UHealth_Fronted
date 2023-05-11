import {createSlice} from '@reduxjs/toolkit';
import { RoutineResponseI, UpdateRoutineI } from '../../../interfaces';

export interface RoutineState{
    routines: RoutineResponseI[];
    activeRoutine: RoutineResponseI | null;
    isOpenEditModalRoutine: boolean;
}


const initialState:RoutineState = {
    routines: [],
    activeRoutine: null,
    isOpenEditModalRoutine: false,
}



export const routineSlice = createSlice({
    name: 'routine',
    initialState,
    reducers:{
        setRoutinesByUser: (state, action) => {
            state.routines = action.payload;
            return state
        },
        setActiveRoutine: (state, action) => {
            state.activeRoutine = action.payload;
            return state;
        },
        updateRoutineById: (state, action) => {
            state.routines = state.routines.map((routine) => {
                if(routine.id === action.payload.routine.id){
                    routine = action.payload.routine;
                    return routine;
                }
                return routine;
            })
            state.routines = state.routines.sort((a,b)=> ( Number(new Date(b.date)) - Number(new Date(a.date))));

            return state;
        },
        removeRoutineById: (state, action) => {
            state.routines = state.routines.filter((routine) => (routine.id !== action.payload));
            return state;
        },
        toogleModaleEditRoutine: (state) => {
            state.isOpenEditModalRoutine = !state.isOpenEditModalRoutine;
            return state;
        }
    }
})

export const {
    setRoutinesByUser,
    removeRoutineById,
    updateRoutineById,
    setActiveRoutine,
    toogleModaleEditRoutine
} = routineSlice.actions;