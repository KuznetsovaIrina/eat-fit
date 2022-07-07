import React from 'react';
import { MENU_ROUTE, DISHES_ROUTE, INGREDIENTS_ROUTE, CALCULATOR_ROUTE, DIARY_ROUTE } from './../router/routes';
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';
import { CalculatorOutlined } from '@ant-design/icons';

const Layout = ({children, user, login, logout}) => {
    return (
        <div className="layout">
            <header className='site-header'>
                <div className='container'>
                    <div className='site-header__top'>
                        <div className='logo'>
                            Eat Fit
                        </div>
                        <nav className='menu'>
                            <NavLink to={MENU_ROUTE}>Мое меню</NavLink>
                            <NavLink to={DIARY_ROUTE}>Дневник питания</NavLink>
                            <NavLink to={INGREDIENTS_ROUTE}>Ингредиенты</NavLink>
                            <NavLink to={DISHES_ROUTE}>Блюда</NavLink>
                        </nav>
                        <div className='user-panel'>
                            <NavLink className='calculator-link' to={CALCULATOR_ROUTE}>
                                <CalculatorOutlined /> 
                                <span>Калькулятор калорий</span>
                            </NavLink>
                            {user
                                ?
                                    <>
                                        <div className='user'>
                                            <img width='40' src={user.photoURL} alt={user.displayName} />
                                            <span>{user.displayName}</span>
                                            <button onClick={logout}>Выход</button>
                                        </div>
                                    </>
                                :
                                    <Button type='primary' onClick={login}>Вход</Button>
                            }
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <div className='container'>
                    {children}
                </div>
            </main>
            <footer className='site-footer'>
                <div className='container'>
                    copyright 2022
                </div>
            </footer>
        </div>
    )
}

export default Layout;