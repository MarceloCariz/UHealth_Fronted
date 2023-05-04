import {createSlice} from '@reduxjs/toolkit';
import { CategoryResponseI } from '../../../interfaces';

export interface CategoryState{
    categories: CategoryResponseI[];
}


const initialState:CategoryState = {
    categories: [],
}



export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers:{
        setCategories: (state, action) => {
            state.categories = action.payload;
            return state;
        }
    }
})

export const {
    setCategories
} = categorySlice.actions;