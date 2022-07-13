import React, { useState, useEffect } from 'react';
import styles from './ingredients.module.scss';
import { PlusOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';
import { Typography, Space } from 'antd';
import { useForm } from 'react-hook-form';
import { ControllerInput, ControllerInputNumber, ControllerSelect } from '../../util/controllers';

const Form = ({ isAdmin, add, edit, categories, addCategory, data, close }) => {
    const { handleSubmit, reset, watch, control } = useForm({ defaultValues: data });
    const [image, setImage] = useState(data ? data.imageURL : null);
    const [categoryTitle, setCategoryTitle] = useState('');

    const watchImage = watch('imageURL');

    useEffect(() => {
        setImage(watchImage);
    }, [watchImage])

    const onSubmit = formData => {
        add
            ? add(formData, formData.category)
            : edit(formData, formData.category, data.category);

        reset();
        close(formData.category, true);
    }

    const onAddCategory = () => {
        if (categoryTitle.trim().length) {
            addCategory({ title: categoryTitle.trim() })
        }
        setCategoryTitle('');
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.boxImage}>
                <div
                    className={styles.preview}
                    style={{ backgroundImage: `url(${image})` }}
                />
                <ControllerInput
                    control={control}
                    name='imageURL'
                    placeholder='Ссылка на изображение'
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
                                    <Space style={{ padding: '10px' }}>
                                        <Input value={categoryTitle} onChange={(e) => setCategoryTitle(e.target.value)} />
                                        <Typography.Link onClick={onAddCategory}>
                                            <PlusOutlined /> Добавить
                                        </Typography.Link>
                                    </Space>
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
                        rules={{ required: 'Это поле обязательно' }}
                    />
                </div>
                <div className={styles.wrap}>
                    <div>
                        <label className={styles.label}>Калорий (на 100 гр.)</label>
                        <ControllerInputNumber
                            control={control}
                            name='kcal'
                            rules={{ required: 'Это поле обязательно' }}
                        />
                    </div>
                    <div>
                        <label className={styles.label}>Белков (на 100 гр.)</label>
                        <ControllerInputNumber
                            control={control}
                            name='squirrels'
                            rules={{ required: 'Это поле обязательно' }}
                        />
                    </div>
                    <div>
                        <label className={styles.label}>Жиров (на 100 гр.)</label>
                        <ControllerInputNumber
                            control={control}
                            name='fats'
                            rules={{ required: 'Это поле обязательно' }}
                        />
                    </div>
                    <div>
                        <label className={styles.label}>Углеводов (на 100 гр.)</label>
                        <ControllerInputNumber
                            control={control}
                            name='carbohydrates'
                            rules={{ required: 'Это поле обязательно' }}
                        />
                    </div>
                </div>
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