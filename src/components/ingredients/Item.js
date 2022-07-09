import React from 'react';
import styles from './ingredients.module.scss';
import { Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const Item = ({ingredient, remove, openEdit}) => {
    return (
        <tr>
            <td>
                <div className={styles.header}>
                    <div
                        className={styles.image}
                        style={{backgroundImage: `url(${ingredient.imageURL})`}}
                    />
                    <div className={styles.title}>
                        {ingredient.title}
                    </div>
                </div>
            </td>
            <td>
                {ingredient.calories}
            </td>
            <td>
                {ingredient.squirrels}
            </td>
            <td>
                {ingredient.fats}
            </td>
            <td>
                {ingredient.carbohydrates}
            </td>
            <td>
                <div className={styles.tools}>
                    <Button onClick={() => openEdit(ingredient)} shape="circle" icon={<EditOutlined  />} size='small' />
                    <Button onClick={() => remove(ingredient.id)} shape="circle" icon={<DeleteOutlined  />} size='small' />
                </div>
            </td>
        </tr>
    )
}

export default Item;