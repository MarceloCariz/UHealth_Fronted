import { Suspense, useEffect } from 'react'
import { BrowserRouter, Routes , Route, useNavigate} from 'react-router-dom'
import {  routesUsers } from './routesUsers'
import { AuthPageLayout, HomePageLayout } from '../layouts'
import { routesNoAuthorization } from './routesNoAuthorization'
import { routesAdmin } from './routesAdmin'
import { AdminLayout } from '../layouts/AdminLayout'


export const Navigation = () => {


    return (
        <Suspense fallback={<span>...Loading</span>}>
            <BrowserRouter>
                {/* No protegidas */}
                <Routes>
                    <Route path='/' element={<AuthPageLayout/>}>

                        {
                            routesNoAuthorization.map(({ path, Component  })=> (
                                <Route 
                                    key={ path }
                                    path={ path }
                                    element={ <Component /> } 
                                />
                            ))
                        }
                    </Route>
                </Routes>

                {/* Protegidas - usuarios*/}
                <Routes>
                    
                    <Route  path='/home' element={<HomePageLayout/>}>
                        {
                            routesUsers.map( ({ path, Component , index }) => (
                                <Route 
                                    key={ path }
                                    path={ path }
                                    element={ <Component /> } 
                                    index={index}
                                />
                            ))
                        }
                    </Route>
                </Routes>

                                {/* Protegidas - Admin*/}
                <Routes>
                    
                    <Route  path='/dashboard' element={<AdminLayout/>}>
                        {
                            routesAdmin.map( ({ path, Component , index }) => (
                                <Route 
                                    key={ path }
                                    path={ path }
                                    element={ <Component /> } 
                                    index={index}
                                />
                            ))
                        }
                    </Route>
                </Routes>


            </BrowserRouter>

        </Suspense>
    )
}
