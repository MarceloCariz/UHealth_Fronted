import { LazyExoticComponent, lazy } from "react";
import Home from "../pages/Home";
import Login from "../pages/Login";

type JSXComponent = () =>  JSX.Element;

export interface RoutesI {
    to: string;
    path: string;
    Component: LazyExoticComponent<JSXComponent> | JSXComponent;
    name: string;
}


export const routesHome: RoutesI[] = [
    {
        path: '/home',
        to: '/home',
        Component: Home,
        name: 'Home'
    },
]