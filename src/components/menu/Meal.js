import React, { useState } from 'react';
import styles from './../../assets/styles/modules/Menu.module.scss';
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import { ControllerInput } from '../../util/controllers';
import FoodTable from './../TableFood/FoodTable';
import { TABLE_THEME_LIGHT } from './../../util/helpers';

const Meal = ({
    meal,
    allIngredientsWithDishes,
    remove,
    saveMeal
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
        saveMeal({
            ...meal,
            food: ingredients,
            total: total,
            title: formData.title,
        });
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
                             <Button htmlType='submit' size='small' shape="circle" icon={<SaveOutlined />} />
                            :
                            <>
                                <Button onClick={() => remove(meal.id)} size='small' shape="circle" icon={<DeleteOutlined />} />
                                <Button onClick={() => setModeEdit(true)} size='small' shape="circle" icon={<EditOutlined />} />
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
                </div>
            </form>
        </li>
    )
}

export default Meal;