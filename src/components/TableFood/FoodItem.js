import React from 'react';
import { InputNumber } from 'antd';

const FoodItem = ({
    item,
    list,
    setList,
    options,
    isEdit = true,
}) => {
    const onChangeWeight = value => {
        setList(list.map(i => i.id === item.id ? { ...i, weight: value} : i));
    }

    const getValue = (oldTitle, key) => {
        const ingredient = options.find(o => o.id === item.id);
        return ingredient ? ingredient[key] : oldTitle;
    }

    return (
        <tr>
            <td>{getValue(item.title, 'title')}</td>
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
            <td>{parseFloat(getValue(item.kcal, 'kcal') / 100 * item.weight).toFixed(2)}</td>
            <td>{parseFloat(getValue(item.squirrels, 'squirrels') / 100 * item.weight).toFixed(2)}</td>
            <td>{parseFloat(getValue(item.fats, 'fats') / 100 * item.weight).toFixed(2)}</td>
            <td>{parseFloat(getValue(item.carbohydrates, 'carbohydrates') / 100 * item.weight).toFixed(2)}</td>
        </tr>
    )
}

export default FoodItem;