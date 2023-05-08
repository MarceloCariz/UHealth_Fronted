import { Suspense, useEffect } from 'react'
import { BrowserRouter, Routes , Route, useNavigate} from 'react-router-dom'
import { routesHome } from './routes'
import { AuthPageLayout, HomePageLayout } from '../layouts'
import { routesNoAuthorization } from './routesNoAuthorization'


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

                {/* Protegidas */}
                <Routes>
                    
                    <Route  path='/home' element={<HomePageLayout/>}>
                        {
                            routesHome.map( ({ path, Component , index }) => (
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
