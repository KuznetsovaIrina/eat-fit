import React from 'react';
import styles from './Dishes.module.scss';
import { Button, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const Item = ({dish, remove, openEdit}) => {
    return (
        <li className={styles.item}>
            <div className={styles.tool}>
                <Tooltip title="Удалить">
                    <Button
                        size='small'
                        type="text"
                        shape="circle"
                        icon={<DeleteOutlined />}
                        onClick={() => remove(dish.id)}
                    />
                </Tooltip>
                <Tooltip title="Редактировать">
                    <Button
                        size='small'
                        type="text"
                        shape="circle"
                        icon={<EditOutlined />}
                        onClick={() => openEdit(dish)}
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

                <ul className={styles.ingredients}>
                    {dish.ingredients && dish.ingredients.map(item => <li key={item.id}>{item.title} <small>({item.weight} гр.)</small></li>)}
                </ul>

                <div className={styles.meta}>
                    <div>На 100 гр.</div>
                    <ul>
                        <li>
                            <b>Калорий, ккал</b>
                            <span>{dish.hundredGrams.kcal}</span>
                        </li>
                        <li>
                            <b>Белков, гр</b>
                            <span>{dish.hundredGrams.squirrels}</span>
                        </li>
                        <li>
                            <b>Жиров, гр</b>
                            <span>{dish.hundredGrams.fats}</span>
                        </li>
                        <li>
                            <b>Углеводов, гр</b>
                            <span>{dish.hundredGrams.carbohydrates}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </li>
    )
}

export default Item;