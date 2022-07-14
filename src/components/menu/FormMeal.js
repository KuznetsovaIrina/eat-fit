import React from 'react';
import { Button } from 'antd';
import { formatDate } from './../../util/helpers';
import { useForm } from 'react-hook-form';
import { ControllerInput } from '../../util/controllers';
import styles from './../../assets/styles/modules/Menu.module.scss';

const FormMeal = ({
    addMeal,
    currentDate
}) => {
    const { handleSubmit, reset, control } = useForm();

    const onSubmit = formData => {
        addMeal({
            title: formData.title,
            date: formatDate(currentDate)
        });

        reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formMeal}>
            <div>
                <ControllerInput
                    control={control}
                    name='title'
                    rules={{ required: 'Это поле обязательно' }}
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