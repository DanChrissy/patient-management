import { FunctionComponent, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes, { DefinedRoute } from '.';
import Patient from '../pages/Patient';

const Router : FunctionComponent = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<div/>}>
                <Routes>
                    {routes.map((route: DefinedRoute, index: number) => {
                        return <Route
                            key={index}
                            path={route.path}
                            element={route.element}
                            caseSensitive={route?.caseSensitivity || true}
                        />
                    })}
                </Routes>
            </Suspense>
            
        </BrowserRouter>
    )
}

export default Router;