import { useNavigate } from "react-router-dom";
import uhealththApi from "../../../api/uhealthAxios";
import { toastError } from "../../../components/ui";
import { LoginI } from "../../../interfaces";
import { setUser, startLogin } from "./authSlice";



export const SignIn = ({email, password}:LoginI) => {
    return async(dispatch:any, getState:any)=>{
        try {
            const response = await uhealththApi.post('/login', {email, password});
            console.log(response.headers['authorization']);
            const token:string = response.headers['authorization'];
            
            if(!token){
                return toastError("Hubo un error");
            }
            const localStorageToken = token.replace("Bearer ", "");
            
            localStorage.setItem("token", localStorageToken);

            dispatch(startLogin(localStorageToken));
        } catch (error) {
            console.log(error)
        }
    }
}


export const getUserByToken = () => {
    return async(dispatch:any, getState:any)=>{

        let token = localStorage.getItem("token");

        const headers = {
            Authorization: `Bearer ${token}`,
        }
        
        const {data} = await uhealththApi("/user/refresh-token", {headers});
        const user = {
            role: data.role,
            email: data.email,
            username: data.admin,
        }
        dispatch(setUser({user, token: data.token}))
        return data;
    }
}

