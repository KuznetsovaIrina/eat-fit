import React, { useState, useEffect } from 'react';
import styles from './Menu.module.scss';
import ListItem from './ListItem';
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Select, Input } from 'antd';
const { Option } = Select;

const Meal = ({ meal, allIngredientsWithDishes, remove, saveMeal }) => {
    const [modeEdit, setModeEdit] = useState(false);
    const [newTitle, setNewTitle] = useState(meal.title);
    
    const [list, setList] = useState(meal.food || []);
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
        setList([...list.filter(l => l.id !== value)]);
    }

    const addListItem = (value) => {
        const item = allIngredientsWithDishes.find(c => c.id === value);
        setList([...list, item]);
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
                            style={{ width: '100%' }}
                            placeholder='Добавьте ингредиенты или блюда из списка'
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

                {!list.length ? 'Ничего еще не добавлено' :
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

export default Meal;