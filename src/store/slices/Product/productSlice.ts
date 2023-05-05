import {createSlice} from '@reduxjs/toolkit';
import { CategoryResponseI } from '../../../interfaces';
import { ProductResponeI } from '../../../interfaces/product';

export interface ProductState{
    products: ProductResponeI[];
}


const initialState:ProductState = {
    products: [],
}



export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers:{
        setProductsByCategory: (state, action) => {
            state.products = action.payload;
            return state;
        }
    }
})

export const {
    setProductsByCategory
} = productSlice.actions;