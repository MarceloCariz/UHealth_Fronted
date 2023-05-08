import uhealththApi from "../../../api/uhealthAxios"
import { useTokenInterceptor } from "../../../hooks";
import { setCategories } from "./categorySlice";

export const getCategories = () => {
    return async(dispatch:any, getState:any)=>{
        try {
            const {data} = await uhealththApi('/category/');
            dispatch(setCategories(data));
        } catch (error) {
            console.log(error)
        }
    }
}