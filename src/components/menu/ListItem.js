import React from 'react';
import { InputNumber } from 'antd';
import styles from './Menu.module.scss';

const ListItem = ({ item, list, setList, isEdit }) => {
    const onChangeWeight = value => {
        setList(list.map(
            ingredient => ingredient.id === item.id ? { ...ingredient, weight: value } : ingredient)
        )
    }

    return (
        <tr>
            <td>{item.title}</td>
            <td>
                {isEdit
                    ?
                        <InputNumber
                            min={1}
                            style={{ width: '100%' }}
                            placeholder='вес в гр.'
                            value={item.weight}
                            onChange={onChangeWeight}
                        />
                    :
                        item.weight
                }
            </td>
            <td>{parseFloat(item.kcal / 100 * item.weight).toFixed(2)}</td>
            <td>{parseFloat(item.squirrels / 100 * item.weight).toFixed(2)}</td>
            <td>{parseFloat(item.fats / 100 * item.weight).toFixed(2)}</td>
            <td>{parseFloat(item.carbohydrates / 100 * item.weight).toFixed(2)}</td>
        </tr>
    )
}

export default ListItem;