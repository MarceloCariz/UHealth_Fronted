import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import { RoutesI } from "./routesUsers";




export const routesAdmin: RoutesI[] = [
    {
        path: '',
        to: '',
        Component: Dashboard,
        name: 'DashBoard',
        index: true
    },
    {
        path: 'users',
        to: 'users',
        Component: Users,
        name: 'Users',
        index: true,
    },

]