import React, { useState, useEffect } from 'react';
import styles from './ingredients.module.scss';
import { InputNumber, Input, Button } from 'antd';
import { useForm, Controller } from 'react-hook-form';

const Form = ({ add, edit, data, close }) => {
    const { handleSubmit, reset, watch, control } = useForm({ defaultValues: data });
    const [image, setImage] = useState(data ? data.imageURL : null);

    const watchImage = watch('imageURL');

    useEffect(() => {
        setImage(watchImage);
    }, [watchImage])

    const onSubmit = data => {
        add ? add(data) : edit(data);
        reset();
        close();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}  className={styles.form}>
            <div className={styles.boxImage}>
                <div
                    className={styles.preview}
                    style={{backgroundImage: `url(${image})`}}
                />
                <Controller
                    control={control}
                    shouldUnregister={true}
                    name='imageURL'
                    render={({
                        field: { value, onChange },
                    }) => (
                        <Input placeholder='Ссылка на изображение' value={value} onChange={onChange} />
                    )}
                />
            </div>
            <div className={styles.fields}>
                <div>
                    <label className={styles.label}>Название</label>
                    <Controller
                        control={control}
                        shouldUnregister={true}
                        name='title'
                        rules={{
                            required: 'Это поле обязательно'
                        }}
                        render={({
                            field: { name, value, onChange },
                            formState: { errors }
                        }) => (
                            <>
                                <Input value={value} onChange={onChange} />
                                {errors[name] && <span className={styles.error}>{errors[name].message}</span>}
                            </>
                        )}
                    />
                </div>
                <div className={styles.wrap}>
                    <div>
                        <label className={styles.label}>Калорий (на 100 гр.)</label>
                        <Controller
                            control={control}
                            shouldUnregister={true}
                            name='calories'
                            rules={{
                                required: 'Это поле обязательно'
                            }}
                            render={({
                                field: { name, value, onChange },
                                formState: { errors }
                            }) => (
                                <>
                                    <InputNumber value={value} onChange={onChange} min={0} style={{ width: '100%' }} />
                                    {errors[name] && <span className={styles.error}>{errors[name].message}</span>}
                                </>
                            )}
                        />
                    </div>
                    <div>
                        <label className={styles.label}>Белков (на 100 гр.)</label>
                        <Controller
                            control={control}
                            shouldUnregister={true}
                            name='squirrels'
                            rules={{
                                required: 'Это поле обязательно'
                            }}
                            render={({
                                field: { name, value, onChange },
                                formState: { errors }
                            }) => (
                                <>
                                    <InputNumber value={value} onChange={onChange} min={0} style={{ width: '100%' }} />
                                    {errors[name] && <span className={styles.error}>{errors[name].message}</span>}
                                </>
                            )}
                        />
                    </div>
                    <div>
                        <label className={styles.label}>Жиров (на 100 гр.)</label>
                        <Controller
                            control={control}
                            shouldUnregister={true}
                            name='fats'
                            rules={{
                                required: 'Это поле обязательно'
                            }}
                            render={({
                                field: { name, value, onChange },
                                formState: { errors }
                            }) => (
                                <>
                                    <InputNumber value={value} onChange={onChange} min={0} style={{ width: '100%' }} />
                                    {errors[name] && <span className={styles.error}>{errors[name].message}</span>}
                                </>
                            )}
                        />
                    </div>
                    <div>
                        <label className={styles.label}>Углеводов (на 100 гр.)</label>
                        <Controller
                            control={control}
                            shouldUnregister={true}
                            name='carbohydrates'
                            rules={{
                                required: 'Это поле обязательно'
                            }}
                            render={({
                                field: { name, value, onChange },
                                formState: { errors }
                            }) => (
                                <>
                                    <InputNumber value={value} onChange={onChange} min={0} style={{ width: '100%' }} />
                                    {errors[name] && <span className={styles.error}>{errors[name].message}</span>}
                                </>
                            )}
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