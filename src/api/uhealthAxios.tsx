import axios from "axios";


const uhealththApi = axios.create({
    baseURL: 'http://localhost:8080',
})
// Agrega el interceptor para el token de autenticación
uhealththApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Obtén el token del local storage o de cualquier otra fuente
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    }
);
export default uhealththApi;