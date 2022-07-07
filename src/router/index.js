import {HOME_ROUTE, MENU_ROUTE, DISHES_ROUTE, INGREDIENTS_ROUTE, CALCULATOR_ROUTE, DIARY_ROUTE } from './routes';
import Home from './../pages/Home';
import Menu from './../pages/Menu';
import Dishes from './../pages/Dishes';
import Ingredients from './../pages/Ingredients';
import Calculator from './../pages/Calculator';
import Diary from './../pages/Diary';

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    },
]

export const privateRoutes = [
    {
        path: MENU_ROUTE,
        Component: Menu
    },
    {
        path: DISHES_ROUTE,
        Component: Dishes
    },
    {
        path: CALCULATOR_ROUTE,
        Component: Calculator
    },
    {
        path: INGREDIENTS_ROUTE,
        Component: Ingredients
    },
    {
        path: DIARY_ROUTE,
        Component: Diary
    },
]