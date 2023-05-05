import { Suspense } from 'react'
import { BrowserRouter, Routes , Route} from 'react-router-dom'
import { routesHome } from './routes'
import { HomePageLayout } from '../layouts'
import { routesNoAuthorization } from './routesNoAuthorization'

export const Navigation = () => {
    return (
        <Suspense fallback={<span>...Loading</span>}>
            <BrowserRouter>
                {/* No protegidas */}
                <Routes>
                        {
                            routesNoAuthorization.map(({ path, Component  })=> (
                                <Route 
                                    key={ path }
                                    path={ path }
                                    element={ <Component /> } 
                                />
                            ))
                        }
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
