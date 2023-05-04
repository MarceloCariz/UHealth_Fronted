import Login from "../pages/Login";
import { RoutesI } from "./routes";



export const routesNoAuthorization: RoutesI[] = [
    {
        path: '/',
        to: '/',
        Component: Login,
        name: 'Login'
    }
]