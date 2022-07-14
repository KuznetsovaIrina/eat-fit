import React from 'react';
import { NavLink } from 'react-router-dom';
import { CALCULATOR_ROUTE } from './../../router/routes';
import { Button } from 'antd';
import styles from './Menu.module.scss';

const Itogo = ({userNorm, total}) => {
    return (
        <div className={styles.userNorm}>
            {userNorm ?
                <>
                    <div>Ваша норма на день</div>
                    <ul>
                        <li
                            className={total.kcal > userNorm.calories ? styles.red : styles.green}
                        >
                            Калорий: {userNorm.calories} ккал
                        </li>
                        <li
                            className={total.squirrels > userNorm.squirrels ? styles.red : styles.green}
                        >
                            Белков: {userNorm.squirrels} гр
                        </li>
                        <li
                            className={total.fats > userNorm.fats ? styles.red : styles.green}
                        >
                            Жиров: {userNorm.fats} гр
                        </li>
                        <li
                            className={total.carbohydrates > userNorm.carbohydrates ? styles.red : styles.green}
                        >
                            Углеводов: {userNorm.carbohydrates} гр
                        </li>
                    </ul>
                </> : <Button><NavLink to={CALCULATOR_ROUTE}>Подсчитать норму</NavLink></Button>}
            <div>Итого:</div>
            <ul>
                <li>Калорий: {total.kcal} ккал</li>
                <li>Белков: {total.squirrels} гр</li>
                <li>Жиров: {total.fats} гр</li>
                <li>Углеводов: {total.carbohydrates} гр</li>
            </ul>
        </div>
    )
}

export default Itogo;