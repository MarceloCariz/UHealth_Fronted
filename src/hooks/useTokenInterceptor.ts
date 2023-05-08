import axios from "axios";
import { useAppDispatch } from "./reduxHook";
import { logout } from "../store/slices/auth/authSlice";

export const useTokenInterceptor = () => {
    const dispatch = useAppDispatch();
    
    axios.interceptors.request.use((config) => {
        const token = localStorage.getItem('token'); // Obtén el token del local storage o de cualquier otra fuente
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    }, (error) => {

        return Promise.reject(error);
    });
    
    axios.interceptors.response.use((response) => {
    return response;
    }, (error) => {
    if (error.response.status === 401) {
        // Maneja el error de autenticación, como redireccionar a la página de inicio de sesión
        dispatch(logout()); // Ejemplo: dispatch de una acción de logout
    }
    
    return Promise.reject(error);
    });
};