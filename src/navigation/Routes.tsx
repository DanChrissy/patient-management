import { FunctionComponent, ReactNode, Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Parse from 'parse';
import { BrowserRouter, Routes, Route, Navigate, HashRouter } from 'react-router-dom';
import { DefinedRoute, routes, patientRoutes, doctorRoutes } from '.';
import DefaultLayout from '../layouts/DefaultLayout';
import Patient from '../pages/Patient';
import { getUser, isAuthenticated } from '../store/authReducer';

// const Parse = require('parse/node');

const PARSE_APPLICATION_ID = 'aP52pt7KA3a8u4M7FnZaf9jFBMbBH6erqQ7RwPqV';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'ZGCC1O8rmfmhwzkCfqfIUxfFVUeTgvNwsqRScl11';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

const Router : FunctionComponent = () => {
    const user = useSelector(getUser);
    const isUserAuthenticated = useSelector(isAuthenticated);

    console.log('IsAuthenticated: ', isUserAuthenticated);

    return (
        <HashRouter>
            <DefaultLayout>
                <Suspense fallback={<div/>}>
                    <Routes>
                        {[...routes, ...patientRoutes, ...doctorRoutes].map((route: DefinedRoute, index: number) => {
                            return <Route
                                key={index}
                                path={route.path}
                                element={route.element}
                                caseSensitive={route.caseSensitivity}
                            >
                                {(route.children || [])?.map((childRoute, childIndex) => {
                                    return (
                                        <Route
                                            key={`child-route-${childIndex}`}
                                            path={childRoute.path}
                                            element={childRoute.element}
                                        />
                                    )
                                })}
                            </Route>
                        })}
                    </Routes>
                </Suspense>
            </DefaultLayout>
        </HashRouter>
    )
}

export default Router;