import React, { useState, useEffect } from 'react';
import { ControllerInputNumber, ControllerTextArea, ControllerInput } from './../../util/controllers';
import { useForm, Controller } from 'react-hook-form';
import { Button, Switch, Select, Input, InputNumber, Space, Typography } from 'antd';
import styles from './Dishes.module.scss';
import { PlusOutlined } from '@ant-design/icons';
import { message } from 'antd';
const { Option } = Select;


const ListItem = ({item, list, setList}) => {
    const onChangeWeight = value => {
        setList(list.map(
            ingredient => ingredient.id === item.id ? { ...ingredient, weight: value} : ingredient)
        );
    }

    return (
        <tr>
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

const FormAddNewIngredient = ({addIngredient}) => {
    const [newIngredient, setNewIngredient] = useState({
        title: '',
        kcal: null,
        squirrels: null,
        fats: null,
        carbohydrates: null,
    });

    const onAddIngredient = () => {
        const isNotError = newIngredient.title.trim().length
            && newIngredient.kcal !== null
            && newIngredient.squirrels !== null
            && newIngredient.fats !== null
            && newIngredient.carbohydrates !== null;

        if (isNotError) {
            addIngredient(newIngredient);
            setNewIngredient({
                title: '',
                kcal: null,
                squirrels: null,
                fats: null,
                carbohydrates: null,
            })
        } else {
            message.error('Необходимо заполнить все поля')
        }
    }

    return (
        <div className={styles.newIngredientForm}>
            <label className={styles.labelNewIngredient}>
                Добавить новый
                <small>После успешного добавления, выберите его из списка</small>
            </label>
            <Space>
                <Input
                    value={newIngredient.title}
                    placeholder='Название'
                    onChange={e => setNewIngredient({...newIngredient, title: e.target.value})}
                />

                <InputNumber
                    value={newIngredient.kcal}
                    placeholder='Калорий на 100 гр.'
                    min={0}
                    onChange={value => setNewIngredient({...newIngredient, kcal: value})}
                />
                <InputNumber
                    value={newIngredient.squirrels}
                    placeholder='Белков на 100 гр.'
                    min={0}
                    onChange={value => setNewIngredient({...newIngredient, squirrels: value})}
                />
                <InputNumber
                    value={newIngredient.fats}
                    placeholder='Жиров на 100 гр.'
                    min={0}
                    onChange={value => setNewIngredient({...newIngredient, fats: value})}
                />
                <InputNumber
                    value={newIngredient.carbohydrates}
                    placeholder='Углеводов на 100 гр.'
                    min={0}
                    onChange={value => setNewIngredient({...newIngredient, carbohydrates: value})}
                />
                <Typography.Link onClick={onAddIngredient}>
                    <PlusOutlined /> Добавить
                </Typography.Link>
            </Space>
        </div>
    )
}

const Form = ({ data = {}, add, addIngredient, edit, categories, close }) => {
    const { handleSubmit, reset, resetField, watch, control } = useForm({ defaultValues: {
        ...data,
        kcal: edit ? data.hundredGrams.kcal : '',
        fats: edit ? data.hundredGrams.fats : '',
        carbohydrates: edit ? data.hundredGrams.carbohydrates : '',
        squirrels: edit ? data.hundredGrams.squirrels : '',
        ingredients: edit && data.ingredients ? data.ingredients.map(i => i.id) : []
    } });

    const [image, setImage] = useState(data ? data.imageURL : null);
    const [withIngredients, setWithIngredients] = useState(add ? true : data.total);
    const [list, setList] = useState(data.ingredients || []);
    
    const watchImage = watch('imageURL');

    const [total, setTotal] = useState({
        weight: 0,
        kcal: 0,
        squirrels: 0,
        fats: 0,
        carbohydrates: 0
    });

    const [hundredGrams, setHundredGrams] = useState({
        weight: 0,
        kcal: 0,
        squirrels: 0,
        fats: 0,
        carbohydrates: 0
    });
    
    useEffect(() => {
        setImage(watchImage);
    }, [watchImage])

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
    }, [list])

    useEffect(() => {
        if (total.weight > 0) {
            setHundredGrams({
                weight: 100,
                kcal: parseFloat(total.kcal / total.weight * 100).toFixed(2),
                squirrels: parseFloat(total.squirrels / total.weight * 100).toFixed(2),
                fats: parseFloat(total.fats / total.weight * 100).toFixed(2),
                carbohydrates: parseFloat(total.carbohydrates / total.weight * 100).toFixed(2)
            });
        } else {
            setHundredGrams({
                weight: 0,
                kcal: 0,
                squirrels: 0,
                fats: 0,
                carbohydrates: 0
            });
        }
        
    }, [total])

    const onSubmit = formData => {
        const dish = {
            title: formData.title,
            imageURL: formData.imageURL || '#',
            description: formData.description,
        }

        if (withIngredients) {
            dish.total = total;
            dish.ingredients = list;
            dish.hundredGrams = hundredGrams;
        }

        if (!withIngredients) {
            dish.hundredGrams = {
                kcal: formData.kcal,
                squirrels: formData.squirrels,
                fats: formData.fats,
                carbohydrates: formData.carbohydrates,
            }
        }

        if (edit) {
            dish.id = data.id
        }

        add ? add(dish) : edit(dish);

        reset();
        resetField('ingredients');
        setList([]);
        close();
    }

    const addListItem = (value) => {
        const item = categories.find(c => c.id === value);
        setList([ ...list, item ]);
    }

    const removeListItem = (value) => {
        setList([ ...list.filter(l => l.id !== value) ]);
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.smallCol}>
                <div>
                    <div
                        className={styles.imagePreview}
                        style={{ backgroundImage: `url(${image})` }}
                    />
                    <ControllerInput
                        control={control}
                        name='imageURL'
                        placeholder='Ссылка на изображение'
                    />
                </div>

                <div>
                    <label className={styles.label}>Название</label>
                    <ControllerInput
                        control={control}
                        name='title'
                        rules={{ required: 'Это поле обязательно' }}
                    />
                </div>

                <div>
                    <label className={styles.label}>Описание</label>
                    <ControllerTextArea
                        control={control}
                        name='description'
                    />
                </div>

                <div>
                    <Switch checked={withIngredients} onChange={checked => setWithIngredients(checked)} />
                    <span className={styles.switchText}>Сготовить из ингредиентов</span>
                </div>
            </div>

            <div className={styles.bigCol}>
                {!withIngredients
                    ?
                    <>
                        <div>
                            <label className={styles.label}>Калорий (на 100 гр.)</label>
                            <ControllerInputNumber
                                control={control}
                                style={{width: '100%'}}
                                name='kcal'
                                rules={{ required: 'Это поле обязательно' }}
                            />
                        </div>
                        <div>
                            <label className={styles.label}>Белков (на 100 гр.)</label>
                            <ControllerInputNumber
                                control={control}
                                style={{width: '100%'}}
                                name='squirrels'
                                rules={{ required: 'Это поле обязательно' }}
                            />
                        </div>
                        <div>
                            <label className={styles.label}>Жиров (на 100 гр.)</label>
                            <ControllerInputNumber
                                control={control}
                                style={{width: '100%'}}
                                name='fats'
                                rules={{ required: 'Это поле обязательно' }}
                            />
                        </div>
                        <div>
                            <label className={styles.label}>Углеводов (на 100 гр.)</label>
                            <ControllerInputNumber
                                control={control}
                                style={{width: '100%'}}
                                name='carbohydrates'
                                rules={{ required: 'Это поле обязательно' }}
                            />
                        </div>
                    </>
                    :
                    <div className={styles.ingredients}>
                        <label className={styles.label}>Ингредиенты</label>
                        
                        <FormAddNewIngredient addIngredient={addIngredient}  />
                        
                        <Controller
                            control={control}
                            name={'ingredients'}
                            rules={{ required: 'Это поле обязательно' }}
                            render={({
                                field: { name, value, onChange },
                                formState: { errors }
                            }) => (
                                <>
                                    <Select
                                        value={value}
                                        onChange={onChange}
                                        mode='multiple'
                                        showSearch
                                        style={{ width: '100%' }}
                                        optionFilterProp="children"
                                        onDeselect={removeListItem}
                                        onSelect={addListItem}
                                        placeholder='Выберите ингредиенты из списка'
                                    >
                                        {categories.map(c => <Option key={c.id} value={c.id}>{c.title}</Option>)}
                                    </Select>
                                    {errors[name] && <span style={styles.error}>{errors[name].message}</span>}
                                </>
                            )}
                        />

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
                                {list.length ? list.map(item =>
                                    <ListItem
                                        setList={setList}
                                        key={item.id}
                                        item={item}
                                        list={list}
                                    />)
                                : <tr><td>Нет добавленных ингредиентов</td></tr>}
                            </tbody>

                            <tfoot>
                                <tr>
                                    <td>Итого:</td>
                                    <td>{total.weight}</td>
                                    <td>{total.kcal}</td>
                                    <td>{total.squirrels}</td>
                                    <td>{total.fats}</td>
                                    <td>{total.carbohydrates}</td>
                                </tr>
                                <tr>
                                    <td>Итого на 100 грамм:</td>
                                    <td>{hundredGrams.weight}</td>
                                    <td>{hundredGrams.kcal}</td>
                                    <td>{hundredGrams.squirrels}</td>
                                    <td>{hundredGrams.fats}</td>
                                    <td>{hundredGrams.carbohydrates}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                }
            </div>

            <div className={styles.submit}>
                <Button type='primary' size='large' htmlType='submit'>
                    {add ? 'Добавить' : 'Редактировать'}
                </Button>
            </div>
        </form>
    )
}

export default Form;