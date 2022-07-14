import React, { useState } from 'react';
import styles from './Menu.module.scss';
import { Button, Input } from 'antd';
import moment from 'moment';

const FormMeal = ({ addMeal, currentDate }) => {
    const [newMealTitle, setNewMealTitle] = useState('');

    const createMeal = (e) => {
        e.preventDefault();

        if (newMealTitle.trim().length) {
            addMeal({
                title: newMealTitle,
                date: moment(currentDate).format('YYYY-MM-DD')
            });
            setNewMealTitle('');
        }
    }

    return (
        <form onSubmit={createMeal} className={styles.formNewMeal}>
            <Input
                value={newMealTitle}
                onChange={(e) => setNewMealTitle(e.target.value)}
                placeholder='Название'
            />
            <Button htmlType='submit' type='primary' size='middle'>
                Добавить прием пищи
            </Button>
        </form>
    )
}

export default FormMeal;