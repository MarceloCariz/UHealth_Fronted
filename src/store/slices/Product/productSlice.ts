import {createSlice} from '@reduxjs/toolkit';
import { ProductResponeI } from '../../../interfaces/product';

export interface ProductState{
    products: ProductResponeI[];
    allProducts: ProductResponeI[];
    activeProduct: ProductResponeI | null;
    isOpenModalProductActions:{active : boolean, type: 'add' | 'edit' | ''};
}


const initialState:ProductState = {
    products: [],
    activeProduct: null,
    allProducts: [],
    isOpenModalProductActions: {active: false, type: ''},
}



export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers:{
        setAllProducts: (state, action) => {
            state.allProducts = action.payload;
            return state;
        },
        setActiveProduct: (state, action) => {
            state.activeProduct = action.payload;
            return state;
        },
        setProductsByCategory: (state, action) => {
            state.products = action.payload;
            return state;
        },
        addProduct:(state, action) => {
            state.allProducts = [...state.allProducts, action.payload.product];
            return state;
        },
        updateProduct:(state, action) => {
            state.allProducts = state.allProducts.map((product) => {
                if(product.id === action.payload.product.id){
                    product = action.payload.product;
                    return product;
                }
                return product;
            })

            return state;
        },
        removeProduct: (state, action) => {
            state.allProducts = state.allProducts.filter((p) => (p.id !== action.payload.id));
            return state;
        },
        toogleModalProductActions: (state, action) => {
            state.isOpenModalProductActions.active = !state.isOpenModalProductActions.active;
            state.isOpenModalProductActions.type = action.payload;
            return state;
        }
    }
})

export const {
    setProductsByCategory,
    setAllProducts,
    setActiveProduct,
    addProduct,
    removeProduct,
    updateProduct,
    toogleModalProductActions
} = productSlice.actions;