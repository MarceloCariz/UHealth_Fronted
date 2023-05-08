import { useNavigate } from "react-router-dom";
import uhealththApi from "../../../api/uhealthAxios";
import { toastError } from "../../../components/ui";
import { LoginI } from "../../../interfaces";
import { setError, setUser, startLogin } from "./authSlice";
import { AxiosError } from "axios";



export const SignIn = ({email, password}:LoginI) => {
    return async(dispatch:any, getState:any)=>{
        try {
            const response = await uhealththApi.post('/login', {email, password});
            
            if(response.status === 401){
                return toastError("Correo o contraseña incorrectos");
            }

            const token:string = response.headers['authorization'];
            

            if(!token){
                return toastError("Hubo un error");
            }
            const localStorageToken = token.replace("Bearer ", "");
            
            localStorage.setItem("token", localStorageToken);

            dispatch(startLogin(localStorageToken));
        } catch (error : any) {
            console.log(error)
            if(error.response.status === 401){
                dispatch(setError("Correo o contraseña incorrectos"))
                return toastError("Correo o contraseña incorrectos");
            }
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
            username: data.username,
        }
        dispatch(setUser({user, token: data.token}))
        return data;
    }
}

