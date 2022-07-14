import React from 'react';
import { InputNumber } from 'antd';

const FoodItem = ({
    item,
    list,
    setList,
    isEdit = true
}) => {
    const onChangeWeight = value => {
        setList(list.map(i => i.id === item.id ? { ...i, weight: value} : i));
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

export default FoodItem;