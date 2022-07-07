import React from 'react';
import { HOME_ROUTE, MENU_ROUTE } from './router/routes';
import { publicRoutes, privateRoutes } from './router/index';
import { Routes, Route, Navigate } from 'react-router-dom';

const AppRouter = ({ user }) => {
    return user
        ?
        <Routes>
            {privateRoutes.map(({ path, Component, layout }) => <Route key={path} path={path} element={<Component layout={layout} />} />)}
            <Route path="*" element={<Navigate to={MENU_ROUTE} replace />} />
        </Routes>
        :
        <Routes>
            {publicRoutes.map(({ path, Component, layout }) => <Route key={path} path={path} element={<Component layout={layout} />} />)}
            <Route path="*" element={<Navigate to={HOME_ROUTE} replace />} />
        </Routes>
}

export default AppRouter;