import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setMenu, addMeal, removeMeal, updateMeal, setCurrentDateAC } from './../redux/menu-reducer';
import { getAllIngredientsWithDishes, getMealsToday, getTotalToday } from '../redux/selectors';
import moment from 'moment';
import { ArrowLeftOutlined, CalendarOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import styles from './../components/menu/Menu.module.scss';
import Meal from '../components/menu/Meal';
import FormMeal from '../components/menu/FormMeal';
import Itogo from '../components/menu/Itogo';

const Menu = ({
    userNorm,
    allIngredientsWithDishes,
    meals,
    addMeal,
    removeMeal,
    updateMeal,
    setMenu,
    setCurrentDateAC,
    total
}) => {
    const [currentDate, setCurrentDate] = useState(moment());

    useEffect(() => {
        setMenu();
    }, []);

    useEffect(() => {
        setCurrentDateAC(moment(currentDate).format('YYYY-MM-DD'));
    }, [currentDate]);

    const prevDay = () => {
        setCurrentDate(moment(currentDate).subtract(1, 'days'));
    }

    const nextDay = () => {
        setCurrentDate(moment(currentDate).add(1, 'days'));
    }

    const toToday = () => {
        setCurrentDate(moment());
    }

    const saveMeal = (meal) => {
        updateMeal({
            ...meal,
            date: moment(currentDate).format('YYYY-MM-DD')
        });
    }

    return (
        <div className={styles.menu}>
            <div className={styles.calendar}>
                <div className={styles.header}>
                    <div className={styles.date}>
                        {moment(currentDate).format('DD.MM.YYYY')}
                    </div>
                    <div className={styles.nav}>
                        <Button onClick={prevDay} size='small' shape="circle" icon={<ArrowLeftOutlined />} />
                        <Button onClick={toToday} size='small' shape="circle" icon={<CalendarOutlined />} />
                        <Button onClick={nextDay} size='small' shape="circle" icon={<ArrowRightOutlined />} />
                    </div>
                </div>

                <div className={styles.body}>
                    {!!meals.length &&
                        <ul className={styles.meals}>
                            {meals.map(m =>
                                <Meal
                                    key={m.id}
                                    meal={m}
                                    allIngredientsWithDishes={allIngredientsWithDishes}
                                    remove={removeMeal}
                                    saveMeal={saveMeal}
                                />
                            )}
                        </ul>}

                    <FormMeal
                        addMeal={addMeal}
                        currentDate={currentDate}
                    />
                </div>
            </div>

            <Itogo
                userNorm={userNorm}
                total={total}
            />
        </div>
    )
}

const mapStateToProps = (state) => ({
    userNorm: state.calculator.data.norm,
    meals: getMealsToday(state),
    total: getTotalToday(state),
    allIngredientsWithDishes: getAllIngredientsWithDishes(state),
    dishes: state.dishes.dishes
});

export default connect(mapStateToProps, {
    setMenu,
    addMeal,
    removeMeal,
    updateMeal,
    setCurrentDateAC
})(Menu);