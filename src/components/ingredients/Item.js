import React from 'react';
import styles from './../../assets/styles/modules/ingredients.module.scss';
import { Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {USER_CATEGORY_INGREDIENTS} from './../../util/helpers';

const Item = ({
    ingredient,
    remove,
    openEdit,
    index,
    isAdmin,
    currentCategory
}) => {
    return (
        <tr>
            <td>
                <div className={styles.header}>
                    <span className={styles.index}>{++index}.</span>
                    <div
                        className={styles.image}
                        style={ingredient.imageURL && {backgroundImage: `url(${ingredient.imageURL})`}}
                    />
                    <div className={styles.title}>
                        {ingredient.title}
                    </div>
                </div>
            </td>
            <td>{ingredient.kcal}</td>
            <td>{ingredient.squirrels}</td>
            <td>{ingredient.fats}</td>
            <td>{ingredient.carbohydrates}</td>
            <td>
                {(currentCategory === USER_CATEGORY_INGREDIENTS || isAdmin) &&
                    <div className={styles.tools}>
                        <Button onClick={() => openEdit(ingredient)} shape="circle" icon={<EditOutlined  />} size='small' />
                        <Button onClick={() => remove(ingredient.id, currentCategory)} shape="circle" icon={<DeleteOutlined  />} size='small' />
                    </div>
                }
            </td>
        </tr>
    )
}

export default Item;