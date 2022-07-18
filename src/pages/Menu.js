import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setMenu, addMeal, removeMeal, updateMeal, setCurrentDateAC } from './../redux/menu-reducer';
import { getAllIngredientsWithDishes, getMealsToday, getTotalToday } from '../redux/selectors';
import { formatDate, DATE_SHOW_FORMAT, addDays, subtractDays, getToday } from './../util/helpers';
import { ArrowLeftOutlined, CalendarOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import styles from './../assets/styles/modules/Menu.module.scss';
import Meal from '../components/menu/Meal';
import FormMeal from '../components/menu/FormMeal';
import Itogo from '../components/menu/Itogo';
import Loader from './../components/Loader';

const Menu = ({
    userNorm,
    allIngredientsWithDishes,
    meals,
    addMeal,
    removeMeal,
    updateMeal,
    setMenu,
    setCurrentDateAC,
    total,
    loading
}) => {
    const [currentDate, setCurrentDate] = useState(getToday());

    useEffect(() => {
        setCurrentDateAC(formatDate(currentDate));
        setMenu();
    }, [currentDate, setMenu, setCurrentDateAC]);

    const prevDay = () => {
        setCurrentDate(subtractDays(currentDate, 1));
    }

    const nextDay = () => {
        setCurrentDate(addDays(currentDate, 1));
    }

    const toToday = () => {
        setCurrentDate(getToday());
    }

    return (
        <div className={styles.menu}>
            <div className={styles.calendar}>
                <div className={styles.header}>
                    <div className={styles.date}>
                        {formatDate(currentDate, DATE_SHOW_FORMAT)}
                    </div>
                    <div className={styles.nav}>
                        <Button onClick={prevDay} size='small' shape="circle" icon={<ArrowLeftOutlined />} />
                        <Button onClick={toToday} size='small' shape="circle" icon={<CalendarOutlined />} />
                        <Button onClick={nextDay} size='small' shape="circle" icon={<ArrowRightOutlined />} />
                    </div>
                </div>

                <div className={styles.body}>
                    {loading ? <Loader small={true} /> :
                        <ul className={styles.meals}>
                            {meals.map(m =>
                                <Meal
                                    key={m.id}
                                    meal={m}
                                    allIngredientsWithDishes={allIngredientsWithDishes}
                                    remove={removeMeal}
                                    updateMeal={updateMeal}
                                    currentDate={formatDate(currentDate)}
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
    dishes: state.dishes.dishes,
    loading: state.menu.loading,
});

export default connect(mapStateToProps, {
    setMenu,
    addMeal,
    removeMeal,
    updateMeal,
    setCurrentDateAC
})(Menu);