import React from 'react';
import { ControllerInputNumber } from './../util/controllers';
import { Space } from 'antd';

const CaloriesField = ({
    control,
    hiddenLabels = false
}) => {
    return (
        <Space>
            <div>
                {!hiddenLabels && <label>Калорий (на 100 гр.)</label>}
                <ControllerInputNumber
                    control={control}
                    name='kcal'
                    placeholder='Калорий (на 100 гр.)'
                    rules={{ required: 'Это поле обязательно' }}
                />
            </div>
            <div>
                {!hiddenLabels && <label>Белков (на 100 гр.)</label>}
                <ControllerInputNumber
                    control={control}
                    name='squirrels'
                    placeholder='Белков (на 100 гр.)'
                    rules={{ required: 'Это поле обязательно' }}
                />
            </div>
            <div>
                {!hiddenLabels && <label>Жиров (на 100 гр.)</label>}
                <ControllerInputNumber
                    control={control}
                    name='fats'
                    placeholder='Жиров (на 100 гр.)'
                    rules={{ required: 'Это поле обязательно' }}
                />
            </div>
            <div>
                {!hiddenLabels && <label>Углеводов (на 100 гр.)</label>}
                <ControllerInputNumber
                    control={control}
                    name='carbohydrates'
                    placeholder='Углеводов (на 100 гр.)'
                    rules={{ required: 'Это поле обязательно' }}
                />
            </div>
        </Space>
    )
}

export default CaloriesField;