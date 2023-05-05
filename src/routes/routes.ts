import { LazyExoticComponent, lazy } from "react";
import Home from "../pages/Home";
import Routines from "../pages/Routines";

type JSXComponent = () =>  JSX.Element;

export interface RoutesI {
    to: string;
    path: string;
    Component: LazyExoticComponent<JSXComponent> | JSXComponent;
    name: string;
    index?: boolean;
}


export const routesHome: RoutesI[] = [
    {
        path: '',
        to: '',
        Component: Home,
        name: 'Home',
        index: true,
    },
    {
        path: 'routines',
        to: 'routines',
        Component: Routines,
        name: 'Routines',
        index: false
    }
]