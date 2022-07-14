import React, { useState } from 'react';
import { ControllerTextArea, ControllerInput } from './../../util/controllers';
import CaloriesField from './../CaloriesField';
import { useForm } from 'react-hook-form';
import { Button, Switch } from 'antd';
import styles from './../../assets/styles/modules/Dishes.module.scss';
import FormNewIngredient from './FormNewIngredient';
import FoodTable from '../TableFood/FoodTable';
import PreviewImage from './../PreviewImage';

const Form = ({
    data = {},
    add,
    edit,
    addIngredient,
    allIngredients,
    close
}) => {
    const { handleSubmit, reset, control } = useForm({
        defaultValues: {
            ...data,
            kcal: data.hundredGrams ? data.hundredGrams.kcal : '',
            fats: data.hundredGrams ? data.hundredGrams.fats : '',
            carbohydrates: data.hundredGrams ? data.hundredGrams.carbohydrates : '',
            squirrels: data.hundredGrams ? data.hundredGrams.squirrels : '',
            ingredients: data.hundredGrams && data.ingredients ? data.ingredients.map(item => item.id) : []
        }
    });

    const [withIngredients, setWithIngredients] = useState(add ? true : data.total);
    const [ingredients, setIngredients] = useState();
    const [total, setTotal] = useState();
    const [hundredGrams, setHundredGrams] = useState();
    const [imageURL, setImageURL] = useState();

    const onSubmit = formData => {
        const dish = {
            title: formData.title,
            imageURL: imageURL,
            description: formData.description,
        }

        if (edit) {
            dish.id = data.id
        }

        if (withIngredients) {
            dish.total = total;
            dish.ingredients = ingredients;
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

        add ? add(dish) : edit(dish);

        reset();
        close();
    }

    return (
        <div className={styles.formBox}>
            {withIngredients && <FormNewIngredient addIngredient={addIngredient} />}

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.smallCol}>
                    <div>
                        <PreviewImage
                            url={data ? data.imageURL : ''}
                            setImageURL={setImageURL}
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
                    {withIngredients
                        ? 
                        <div className={styles.ingredients}>
                            <label>Ингредиенты</label>

                            <div className={styles.ingredientsTable}>
                                <FoodTable
                                    control={control}
                                    options={allIngredients}
                                    returnIngredients={setIngredients}
                                    returnTotal={setTotal}
                                    returnHundredGrams={setHundredGrams}
                                    defaultList={edit ? data.ingredients && data.ingredients : ingredients}
                                    selectName='ingredients'
                                />
                            </div>
                        </div>
                        :
                        <CaloriesField control={control} />
                    }
                </div>

                <div className={styles.submit}>
                    <Button type='primary' size='large' htmlType='submit'>
                        {add ? 'Добавить' : 'Редактировать'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Form;