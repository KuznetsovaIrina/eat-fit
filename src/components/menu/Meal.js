import React, { useState } from 'react';
import styles from './../../assets/styles/modules/Menu.module.scss';
import { DeleteOutlined, EditOutlined, SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button, Popconfirm, message } from 'antd';
import { useForm } from 'react-hook-form';
import { ControllerInput } from '../../util/controllers';
import FoodTable from './../tableFood/FoodTable';
import { TABLE_THEME_LIGHT } from './../../util/helpers';

const Meal = ({
    meal,
    allIngredientsWithDishes,
    remove,
    updateMeal,
    currentDate
}) => {
    const { handleSubmit, control } = useForm({
        defaultValues: {
            title: meal.title,
            ingredients: meal.food ? meal.food.map(item => item.id) : []
        }
    });

    const [modeEdit, setModeEdit] = useState(false);
    const [ingredients, setIngredients] = useState();
    const [total, setTotal] = useState();

    const onSubmit = (formData) => {
        setModeEdit(false);
        updateMeal({
            ...meal,
            food: ingredients,
            total: total,
            title: formData.title,
            date: currentDate,
        })
            .then(m => message.success(m))
            .catch(e => message.error('Что-то пошло не так.'));
    }

    const openEdit = () => {
        setModeEdit(true);
    }

    const closeEdit = () => {
        setModeEdit(false);
    }

    const onConfirmDelete = () => {
        remove(meal.id)
            .then(m => message.success(m))
            .catch(e => message.error('Что-то пошло не так'));
    }

    return (
        <li className={styles.meal}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.mealHeader}>
                    <div className={styles.title}>
                        {modeEdit
                            ?
                            <ControllerInput
                                control={control}
                                name='title'
                                isShouldUnregister={false}
                            />
                            : meal.title
                        }
                    </div>
                    <div className={styles.tools}>
                        {modeEdit
                            ?
                            <Button htmlType='button' onClick={closeEdit} size='small' icon={<CloseCircleOutlined />} shape='circle' />
                            :
                            <>
                                <Popconfirm
                                    title="Точно удалить?"
                                    onConfirm={onConfirmDelete}
                                    okText="Да"
                                    cancelText="Нет"
                                >
                                    <Button htmlType='button' size='small' shape="circle" icon={<DeleteOutlined />} />
                                </Popconfirm>
                                <Button htmlType='button' onClick={openEdit} size='small' icon={<EditOutlined />} shape='circle' />
                            </>
                        }
                    </div>
                </div>
                <div className={styles.list}>
                    {modeEdit && <label>Ингредиенты и Блюда</label>}
                    <FoodTable
                        control={control}
                        options={allIngredientsWithDishes}
                        returnIngredients={setIngredients}
                        returnTotal={setTotal}
                        defaultList={meal.food && meal.food}
                        selectName='ingredients'
                        isEdit={modeEdit}
                        showHundredGrams={false}
                        theme={TABLE_THEME_LIGHT}
                    />
                    {modeEdit && <Button htmlType='submit' size='small' type='primary' icon={<SaveOutlined />}>Сохранить</Button>}
                </div>
            </form>
        </li>
    )
}

export default Meal;