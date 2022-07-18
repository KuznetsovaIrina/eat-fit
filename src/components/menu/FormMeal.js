import React from 'react';
import { Button, message } from 'antd';
import { formatDate } from './../../util/helpers';
import { useForm } from 'react-hook-form';
import { ControllerInput } from '../../util/controllers';
import styles from './../../assets/styles/modules/Menu.module.scss';
import { rules } from './../../util/helpers';

const FormMeal = ({
    addMeal,
    currentDate
}) => {
    const { handleSubmit, reset, control } = useForm();

    const onSubmit = formData => {
        const res = addMeal({
            title: formData.title,
            date: formatDate(currentDate)
        });

        res.then(m => {
            message.success(m);
            reset();
        }).catch(e => message.error('Что-то пошло не так'))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formMeal}>
            <div>
                <ControllerInput
                    control={control}
                    name='title'
                    rules={rules.required}
                    placeholder='Название'
                />
            </div>
            <Button htmlType='submit' type='primary' size='middle'>
                Добавить прием пищи
            </Button>
        </form>
    )
}

export default FormMeal;