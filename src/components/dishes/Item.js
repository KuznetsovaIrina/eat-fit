import React from 'react';
import styles from './Dishes.module.scss';
import { Button, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const Item = ({dish}) => {
    console.log(dish);
    return (
        <li className={styles.item}>
            <div className={styles.tool}>
                <Tooltip title="Удалить">
                    <Button
                        size='small'
                        type="text"
                        shape="circle"
                        icon={<DeleteOutlined />}
                        onClick={() => console.log('remove')}
                    />
                </Tooltip>
                <Tooltip title="Редактировать">
                    <Button
                        size='small'
                        type="text"
                        shape="circle"
                        icon={<EditOutlined />}
                        onClick={() => console.log('edit')}
                    />
                </Tooltip>
            </div>
            <div
                className={styles.image}
                style={{backgroundImage: `url(${dish.imageURL})`}}
            />
            <div className={styles.info}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        {dish.title}
                    </div>
                    <p className={styles.text}>
                        {dish.description}
                    </p>
                </div>

                <div className={styles.meta}>
                    <div>На 100 гр.</div>
                    <ul>
                        <li>
                            <b>Калорий, ккал</b>
                            <span>{parseFloat(dish.hundredGrams.kcal).toFixed(2)}</span>
                        </li>
                        <li>
                            <b>Белков, гр</b>
                            <span>{parseFloat(dish.hundredGrams.squirrels).toFixed(2)}</span>
                        </li>
                        <li>
                            <b>Жиров, гр</b>
                            <span>{parseFloat(dish.hundredGrams.fats).toFixed(2)}</span>
                        </li>
                        <li>
                            <b>Углеводов, гр</b>
                            <span>{parseFloat(dish.hundredGrams.carbohydrates).toFixed(2)}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </li>
    )
}

export default Item;