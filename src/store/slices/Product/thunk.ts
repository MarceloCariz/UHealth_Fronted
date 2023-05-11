import uhealththApi from "../../../api/uhealthAxios"
import { toastError, toastSuccess } from "../../../components/ui";
import { RootState } from "../../store";
import {  addProduct, removeProduct, setAllProducts, setProductsByCategory, updateProduct } from "./productSlice";




export const getAllProducts = () => {
    return async(dispatch:any)=>{
        try {
            const {data} = await uhealththApi(`/products/`);
            dispatch(setAllProducts(data))
        } catch (error) {
            console.log(error)
        }
    }
}

export const getProductByCategory = (categoryId:string) => {
    return async(dispatch:any)=>{
        try {
            const {data} = await uhealththApi(`/products/category/${categoryId}`);
            dispatch(setProductsByCategory(data))
        } catch (error) {
            console.log(error)
        }
    }
}

export const createNewProduct = (product : any, resetForm:any) => {
    return async(dispatch:any)=>{
        

        const categoryId = product.categoryId;

        const newProduct = {
            productName: product.productName,
            calories: product.calories,
            carbs: product.carbs
        }

        try {
            const {data} = await uhealththApi.post(`/products/${categoryId}`, newProduct);
            dispatch(addProduct({product: data}));
            toastSuccess("Producto creado correctamente");
            resetForm();
        } catch (error:any) {
            console.log(error)
            toastError(`${error.response.data !== "" ? error.response.data : "Hubo un error"}`)
        }
    }
}

export const putProduct = (product : any) => {
    return async(dispatch:any)=>{
        

        const productId = product.id;

        const newProduct = {
            productName: product.productName,
            calories: product.calories,
            carbs: product.carbs,
            category:{
                id: product.categoryId
            }
        }

        try {
            const {data} = await uhealththApi.put(`/products/${productId}`, newProduct);
            dispatch(updateProduct({product: data}));
            toastSuccess("Producto actualizado correctamente");
        } catch (error:any) {
            console.log(error)
            toastError(`${error.response.data !== "" ? error.response.data : "Hubo un error"}`)
        }
    }
}

export const deleteProduct = () => {
    return async(dispatch:any, getState: () => RootState)=>{
        
        const {activeProduct} = getState().products;

        if(!activeProduct) return toastError("Hubo un error")
        const productId = activeProduct?.id;

        try {
            const {data} = await uhealththApi.delete(`/products/${productId}`);
            dispatch(removeProduct({id: activeProduct?.id}));
            toastSuccess(data);
        } catch (error:any) {
            console.log(error)
            toastError(`${error.response.data}`)
        }
    }
}

