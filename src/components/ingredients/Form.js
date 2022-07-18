import React, { useState } from 'react';
import styles from './../../assets/styles/modules/ingredients.module.scss';
import { Button, message } from 'antd';
import { useForm } from 'react-hook-form';
import { ControllerInput, ControllerSelect } from '../../util/controllers';
import FormNewCategory from './FormNewCategory';
import CaloriesField from '../CaloriesField';
import PreviewImage from '../PreviewImage';
import { rules } from './../../util/helpers';

const Form = ({
    isAdmin,
    add,
    edit,
    categories,
    addCategory,
    data,
    close
}) => {
    const { handleSubmit, reset, control } = useForm({ defaultValues: data });
    const [imageURL, setImageURL] = useState(null);

    const onSubmit = formData => {
        const res = add
            ? add({...formData, imageURL}, formData.category)
            : edit({...formData, imageURL}, data.category);

        res.then(m => {
            message.success(m);
            reset();
            close(formData.category, true);
        }).catch(e => message.error('Что-то пошло не так'))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.boxImage}>
                <PreviewImage
                    url={data ? data.imageURL : ''}
                    setImageURL={setImageURL}
                />

                {isAdmin &&
                    <div className={styles.categories}>
                        <label className={styles.label}>Категория</label>
                        <ControllerSelect
                            control={control}
                            name='category'
                            options={categories}
                            dropdown={(menu) => (
                                <>
                                    {menu}
                                    <FormNewCategory
                                        addCategory={addCategory}
                                    />
                                </>
                            )}
                        />
                    </div>
                }
            </div>
            <div className={styles.fields}>
                <div>
                    <label className={styles.label}>Название</label>
                    <ControllerInput
                        control={control}
                        name='title'
                        rules={rules.required}
                    />
                </div>
                
                <CaloriesField control={control} />
                
                <div className={styles.submit}>
                    <Button type='primary' size='large' htmlType='submit'>
                        {add ? 'Добавить' : 'Редактировать'}
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default Form;