import uhealththApi from "../../../api/uhealthAxios"
import {  setProductsByCategory } from "./productSlice";



export const getProductByCategory = (productId:string) => {
    return async(dispatch:any, getState:any)=>{
        try {
            const {data} = await uhealththApi(`/products/category/${productId}`);
            dispatch(setProductsByCategory(data))
        } catch (error) {
            console.log(error)
        }
    }
}