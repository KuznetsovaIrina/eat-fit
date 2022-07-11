import React, { useState, useEffect } from 'react';
import { ControllerInputNumber, ControllerTextArea, ControllerInput } from './../../util/controllers';
import { useForm } from 'react-hook-form';
import { Button, Switch, Select, Input, InputNumber } from 'antd';
import styles from './Dishes.module.scss';
const { Option } = Select;




const ListItem = ({item, list, setList}) => {
    const onChangeWeight = value => {
        setList(list.map(l => l.id === item.id ? {...l, weight: value} : l))
    }

    return (
        <tr key={item.id}>
            <td>{item.title}</td>
            <td>
                <InputNumber
                    min={1}
                    style={{width: '100%'}}
                    placeholder='вес в гр.'
                    value={item.weight}
                    onChange={onChangeWeight}
                />
            </td>
            <td>{parseFloat(item.kcal / 100 * item.weight).toFixed(2)}</td>
            <td>{parseFloat(item.squirrels / 100 * item.weight).toFixed(2)}</td>
            <td>{parseFloat(item.fats /  100 * item.weight).toFixed(2)}</td>
            <td>{parseFloat(item.carbohydrates / 100 * item.weight).toFixed(2)}</td>
        </tr>
    )
}


const Form = ({ data = {}, add, categories, close }) => {
    const { handleSubmit, reset, watch, control } = useForm({ defaultValues: data });
    const [image, setImage] = useState(data ? data.imageURL : null);
    const watchImage = watch('imageURL');
    
    const [withIngredients, setWithIngredients] = useState(true);
    const [list, setList] = useState([]);
    
    const [totalWeight, setTotalWeight] = useState(0);
    const [totalCalories, setTotalCalories] = useState(0);
    const [totalSquirrels, setTotalSquirrels] = useState(0);
    const [totalFats, setTotalFats] = useState(0);
    const [totalCarbohydrates, setTotalCarbohydrates] = useState(0);

    const [total100GrWeight, setTotal100GrWeight] = useState(100);
    const [total100GrCalories, setTotal100GrCalories] = useState(0);
    const [total100GrSquirrels, setTotal100GrSquirrels] = useState(0);
    const [total100GrFats, setTotal100GrFats] = useState(0);
    const [total100GrCarbohydrates, setTotal100GrCarbohydrates] = useState(0);
    
    useEffect(() => {
        setImage(watchImage);
    }, [watchImage])

    useEffect(() => {
        if (list.length) {
            list.reduce((prev, current) => {
                setTotalWeight(prev.w + current.weight);
                setTotalCalories(prev.k + current.kcal / 100 * current.weight);
                setTotalSquirrels(prev.s + current.squirrels / 100 * current.weight);
                setTotalFats(prev.f + current.fats / 100 * current.weight);
                setTotalCarbohydrates(prev.c + current.carbohydrates / 100 * current.weight);

                return {
                    w: prev.w + current.weight,
                    k: prev.k + current.kcal / 100 * current.weight,
                    s: prev.s + current.squirrels / 100 * current.weight,
                    f: prev.f + current.fats / 100 * current.weight,
                    c: prev.c + current.carbohydrates / 100 * current.weight
                }
            }, {w: 0, k: 0, s: 0, f: 0, c: 0});
            
            setTotal100GrCalories(totalCalories / totalWeight * 100);
            setTotal100GrSquirrels(totalSquirrels / totalWeight * 100);
            setTotal100GrFats(totalFats / totalWeight * 100);
            setTotal100GrCarbohydrates(totalCarbohydrates / totalWeight * 100);
        } else {
            setTotalWeight(0);
            setTotalCalories(0);
            setTotalSquirrels(0);
            setTotalFats(0);
            setTotalCarbohydrates(0);
            setTotal100GrWeight(0);
            setTotal100GrCalories(0);
            setTotal100GrSquirrels(0);
            setTotal100GrFats(0);
            setTotal100GrCarbohydrates(0);
        }
    }, [list])

    const onSubmit = formData => {
        const dish = {
            title: formData.title,
            imageURL: formData.imageURL || '#',
            description: formData.description,
        }

        if (withIngredients) {
            dish.total = {
                kcal: totalCalories,
                squirrels: totalSquirrels,
                fats: totalFats,
                carbohydrates: totalCarbohydrates,
                weight: totalWeight,
            };

            dish.ingredients = list;

            dish.hundredGrams = {
                kcal: total100GrCalories,
                squirrels: total100GrSquirrels,
                fats: total100GrFats,
                carbohydrates: total100GrCarbohydrates,
            }
        } else {
            dish.hundredGrams = {
                kcal: formData.kcal,
                squirrels: formData.squirrels,
                fats: formData.fats,
                carbohydrates: formData.carbohydrates,
            }
        }

        add(dish);
        reset();
        close();
    }

    const onChangeWithIngredients = (checked) => {
        setWithIngredients(checked);
    }

    const addListItem = (value) => {
        setList([
            ...list,
            categories.find(c => {
                setTotalWeight(totalWeight + c.weight);
                setTotalCalories(totalCalories + c.kcal);
                setTotalSquirrels(totalSquirrels + c.squirrels);
                setTotalFats(totalFats + c.fats);
                setTotalCarbohydrates(totalCarbohydrates + c.carbohydrates);
                return c.id === value;
            })
        ]);
    }

    const removeListItem = (value) => {
        setList([
            ...list.filter(l => l.id !== value)
        ]);
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div
                    style={{ backgroundImage: `url(${image})` }}
                />
                <ControllerInput
                    control={control}
                    name='imageURL'
                    placeholder='Ссылка на изображение'
                />
            </div>

            <div>
                <label>Название</label>
                <ControllerInput
                    control={control}
                    name='title'
                    rules={{ required: 'Это поле обязательно' }}
                />
            </div>

            <div>
                <label>Описание</label>
                <ControllerTextArea
                    control={control}
                    name='description'
                />
            </div>

            <div>
                <Switch checked={withIngredients} onChange={onChangeWithIngredients} /> Сготовить из ингредиентов
            </div>

            {!withIngredients
                ?
                <div className={styles.wrap}>
                    <div>
                        <label>Калорий (на 100 гр.)</label>
                        <ControllerInputNumber
                            control={control}
                            style={{width: '100%'}}
                            name='kcal'
                            rules={{ required: 'Это поле обязательно' }}
                        />
                    </div>
                    <div>
                        <label>Белков (на 100 гр.)</label>
                        <ControllerInputNumber
                            control={control}
                            style={{width: '100%'}}
                            name='squirrels'
                            rules={{ required: 'Это поле обязательно' }}
                        />
                    </div>
                    <div>
                        <label>Жиров (на 100 гр.)</label>
                        <ControllerInputNumber
                            control={control}
                            style={{width: '100%'}}
                            name='fats'
                            rules={{ required: 'Это поле обязательно' }}
                        />
                    </div>
                    <div>
                        <label>Углеводов (на 100 гр.)</label>
                        <ControllerInputNumber
                            control={control}
                            style={{width: '100%'}}
                            name='carbohydrates'
                            rules={{ required: 'Это поле обязательно' }}
                        />
                    </div>
                </div>
                :
                <div className={styles.ingredients}>
                    <Select
                        mode='multiple'
                        showSearch
                        style={{ width: '100%' }}
                        optionFilterProp="children"
                        onDeselect={removeListItem}
                        onSelect={addListItem}
                    >
                        {categories.map(c => <Option key={c.id} value={c.id}>{c.title}</Option>)}
                    </Select>

                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <td>Ингредиент</td>
                                <td>Вес, гр</td>
                                <td>Калорий, ккал</td>
                                <td>Белков, гр</td>
                                <td>Жиров, гр</td>
                                <td>Углеводов, гр</td>
                            </tr>
                        </thead>
                        <tbody>
                            {list.length
                                ?
                                    list.map(item =>
                                        <ListItem
                                            setList={setList}
                                            key={item.id}
                                            item={item}
                                            list={list}
                                        />
                                    )
                                :
                                    <tr>
                                        <td>Нет добавленных ингредиентов</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>Итого:</td>
                                <td>{parseFloat(totalWeight).toFixed(2)}</td>
                                <td>{parseFloat(totalCalories).toFixed(2)}</td>
                                <td>{parseFloat(totalSquirrels).toFixed(2)}</td>
                                <td>{parseFloat(totalFats).toFixed(2)}</td>
                                <td>{parseFloat(totalCarbohydrates).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td>Итого на 100 грамм:</td>
                                <td>{parseFloat(total100GrWeight).toFixed(2)}</td>
                                <td>{parseFloat(total100GrCalories).toFixed(2)}</td>
                                <td>{parseFloat(total100GrSquirrels).toFixed(2)}</td>
                                <td>{parseFloat(total100GrFats).toFixed(2)}</td>
                                <td>{parseFloat(total100GrCarbohydrates).toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            }


            <Button type='primary' size='large' htmlType='submit'>
                {add ? 'Добавить' : 'Редактировать'}
            </Button>
        </form>
    )
}

export default Form;