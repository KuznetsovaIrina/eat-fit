import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllIngredientsWithDishes } from './../redux/ingredients-selector';
import moment from 'moment';
import styles from './../components/menu/Menu.module.scss';
import { ArrowLeftOutlined, CalendarOutlined, ArrowRightOutlined, DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Select, Input, InputNumber } from 'antd';
import { setMenu, addMeal, removeMeal, updateMeal } from './../redux/menu-reducer';
const { Option } = Select;

const ListItem = ({item, list, setList, isEdit}) => {
    const onChangeWeight = value => {
        setList(list.map(
            ingredient => ingredient.id === item.id ? { ...ingredient, weight: value} : ingredient)
        )
    }

    return (
        <tr>
            <td>{item.title}</td>
            <td>
                {isEdit
                    ?
                    <InputNumber
                        min={1}
                        style={{width: '100%'}}
                        placeholder='вес в гр.'
                        value={item.weight}
                        onChange={onChangeWeight}
                    />
                    : item.weight}
            </td>
            <td>{parseFloat(item.kcal / 100 * item.weight).toFixed(2)}</td>
            <td>{parseFloat(item.squirrels / 100 * item.weight).toFixed(2)}</td>
            <td>{parseFloat(item.fats / 100 * item.weight).toFixed(2)}</td>
            <td>{parseFloat(item.carbohydrates / 100 * item.weight).toFixed(2)}</td>
        </tr>
    )
}

const Meal = ({meal, allIngredientsWithDishes, remove, saveMeal}) => {
    const [modeEdit, setModeEdit] = useState(false);
    const [list, setList] = useState(meal.food || []);
    const [newTitle, setNewTitle] = useState(meal.title);
    const [total, setTotal] = useState({
        weight: 0,
        kcal: 0,
        squirrels: 0,
        fats: 0,
        carbohydrates: 0,
    })

    useEffect(() => {
        if (list.length) {
            list.reduce((prev, current) => {
                setTotal({
                    weight: prev.w + current.weight,
                    kcal: parseFloat(prev.k + current.kcal / 100 * current.weight).toFixed(2),
                    squirrels: parseFloat(prev.s + current.squirrels / 100 * current.weight).toFixed(2),
                    fats: parseFloat(prev.f + current.fats / 100 * current.weight).toFixed(2),
                    carbohydrates: parseFloat(prev.c + current.carbohydrates / 100 * current.weight).toFixed(2)
                })
    
                return {
                    w: prev.w + current.weight,
                    k: prev.k + current.kcal / 100 * current.weight,
                    s: prev.s + current.squirrels / 100 * current.weight,
                    f: prev.f + current.fats / 100 * current.weight,
                    c: prev.c + current.carbohydrates / 100 * current.weight
                }
            }, { w: 0, k: 0, s: 0, f: 0, c: 0 });

        } else {
            setTotal({
                weight: 0,
                kcal: 0,
                squirrels: 0,
                fats: 0,
                carbohydrates: 0
            })
        }
    }, [list]);

    const save = () => {
        setModeEdit(false);
        saveMeal({
            id: meal.id,
            food: list,
            total: total,
            title: newTitle,
        });
    }

    const removeListItem = (value) => {
        setList([ ...list.filter(l => l.id !== value) ]);
    }

    const addListItem = (value) => {
        const item = allIngredientsWithDishes.find(c => c.id === value);
        setList([ ...list, item ]);
    }

    return (
        <li className={styles.meal}>
            <div className={styles.mealHeader}>
                <div className={styles.title}>
                    {modeEdit ? <Input value={newTitle} onChange={e => setNewTitle(e.target.value)} /> : meal.title}
                </div>
                <div className={styles.tools}>
                    {modeEdit
                        ? <Button onClick={save} size='small' shape="circle" icon={<SaveOutlined />} />
                        :
                        <>
                            <Button onClick={() => remove(meal.id)} size='small' shape="circle" icon={<DeleteOutlined />} />
                            <Button onClick={() => setModeEdit(true)} size='small' shape="circle" icon={<EditOutlined />} />
                        </>}
                </div>
            </div>
            <div className={styles.list}>
                {modeEdit &&
                    <div className={styles.editSelect}>
                        <Select
                            style={{width: '100%'}}
                            placeholder='Добавьте ингредиенты и блюда из списка'
                            mode='multiple'
                            showSearch
                            optionFilterProp="children"
                            onDeselect={removeListItem}
                            onSelect={addListItem}
                            defaultValue={list.map(i => i.id)}
                        >
                            {allIngredientsWithDishes.map(i => <Option key={i.id} value={i.id}>{i.title}</Option>)}
                        </Select>
                    </div>
                }
                
                {!list.length ? 'Нет еды' :
                    <table>
                        <thead>
                            <tr>
                                <td>Название</td>
                                <td>Вес, гр</td>
                                <td>Калорий, ккал</td>
                                <td>Белков, гр</td>
                                <td>Жиров, гр</td>
                                <td>Углеводов, гр</td>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map(f =>
                                <ListItem
                                    key={f.id}
                                    item={f}
                                    list={list}
                                    setList={setList}
                                    isEdit={modeEdit} />
                            )}
                        </tbody>

                        <tfoot>
                            <tr>
                                <td>Итого</td>
                                <td>{total.weight}</td>
                                <td>{total.kcal}</td>
                                <td>{total.squirrels}</td>
                                <td>{total.fats}</td>
                                <td>{total.carbohydrates}</td>
                            </tr>
                        </tfoot>
                    </table>
                }
            </div>
        </li>
    )
}

const Menu = ({ userNorm, allIngredientsWithDishes, meals, addMeal, removeMeal, updateMeal, setMenu }) => {
    const [currentDate, setCurrentDate] = useState(moment());
    const [newMealTitle, setNewMealTitle] = useState('');

    const [total, setTotal] = useState({
        kcal: 0,
        squirrels: 0,
        fats: 0,
        carbohydrates: 0,
    });

    console.log(meals);

    useEffect(() => {
        setMenu(moment(currentDate).format('YYYY-MM-DD'));
    }, [currentDate]);

    const prevDay = () => {
        const d = moment(currentDate).subtract(1, 'days');
        setCurrentDate(d);
    }

    const nextDay = () => {
        const d = moment(currentDate).add(1, 'days');
        setCurrentDate(d);
    }

    const toToday = () => {
        setCurrentDate(moment());
    }

    const createMeal = (e) => {
        e.preventDefault();

       if (newMealTitle.trim().length) {
            addMeal({
                title: newMealTitle,
                date: moment(currentDate).format('YYYY-MM-DD')
            });
            setNewMealTitle('');
       }
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
                        </ul>
                    }

                    <form onSubmit={createMeal} className={styles.formNewMeal}>
                        <Input
                            value={newMealTitle}
                            onChange={(e) => setNewMealTitle(e.target.value)}
                            placeholder='Название'
                        />
                        <Button htmlType='submit' type='primary' size='middle'>
                            Добавить прием пищи
                        </Button>
                    </form>
                </div>
            </div>

            <div className={styles.userNorm}>
                <div>Ваша норма на день</div>
                <ul>
                    <li>Калорий: {userNorm.calories} ккал</li>
                    <li>Белков: {userNorm.squirrels} гр</li>
                    <li>Жиров: {userNorm.fats} гр</li>
                    <li>Углеводов: {userNorm.carbohydrates} гр</li>
                </ul>
                <div>Итого:</div>
                <ul>
                    <li>Калорий: {total.kcal || 0} ккал</li>
                    <li>Белков: {total.squirrels || 0} гр</li>
                    <li>Жиров: {total.fats || 0} гр</li>
                    <li>Углеводов: {total.carbohydrates || 0} гр</li>
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    userNorm: state.calculator.data.norm,
    meals: state.menu.meals,
    allIngredientsWithDishes: getAllIngredientsWithDishes(state),
    dishes: state.dishes.dishes
});

export default connect(mapStateToProps, {
    setMenu,
    addMeal,
    removeMeal,
    updateMeal
})(Menu);