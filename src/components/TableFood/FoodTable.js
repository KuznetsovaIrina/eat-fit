import React, { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { Select, Tag } from 'antd';
import styles from './../../assets/styles/modules/FoodTable.module.scss';
import FoodItem from './FoodItem';
import { TABLE_THEME_DARK, HUNDRED_GRAMS } from './../../util/helpers';
import { formatNumber, calculateTotalWeight } from './../../util/helpers';
const { Option } = Select;

const FoodTable = ({
    control,
    options,
    defaultList,
    returnIngredients,
    returnTotal,
    returnHundredGrams,
    selectName,
    isEdit = true,
    showHundredGrams = true,
    theme = TABLE_THEME_DARK

}) => {
    const [list, setList] = useState(defaultList || []);
    
    const [total, setTotal] = useState({
        weight: 0,
        kcal: 0,
        squirrels: 0,
        fats: 0,
        carbohydrates: 0
    });
    
    const [hundredGrams, setHundredGrams] = useState({
        weight: 0,
        kcal: 0,
        squirrels: 0,
        fats: 0,
        carbohydrates: 0
    });

    useEffect(() => {
        const totalSum = list.reduce((prev, current) => {
            return {
                w: prev.w + current.weight,
                k: prev.k + calculateTotalWeight(current.kcal, HUNDRED_GRAMS, current.weight),
                s: prev.s + calculateTotalWeight(current.squirrels, HUNDRED_GRAMS, current.weight),
                f: prev.f + calculateTotalWeight(current.fats, HUNDRED_GRAMS, current.weight),
                c: prev.c + calculateTotalWeight(current.carbohydrates, HUNDRED_GRAMS, current.weight),
            }
        }, { w: 0, k: 0, s: 0, f: 0, c: 0 });

        setTotal({
            weight: formatNumber(totalSum.w),
            kcal: formatNumber(totalSum.k),
            squirrels: formatNumber(totalSum.s),
            fats: formatNumber(totalSum.f),
            carbohydrates: formatNumber(totalSum.c)
        });

        returnIngredients &&
            returnIngredients(list);
    }, [list, returnIngredients]);

    useEffect(() => {
        setHundredGrams({
            weight: formatNumber(HUNDRED_GRAMS),
            kcal: formatNumber(calculateTotalWeight(total.kcal, total.weight, HUNDRED_GRAMS)),
            squirrels: formatNumber(calculateTotalWeight(total.squirrels, total.weight, HUNDRED_GRAMS)),
            fats: formatNumber(calculateTotalWeight(total.fats, total.weight, HUNDRED_GRAMS)),
            carbohydrates: formatNumber(calculateTotalWeight(total.carbohydrates, total.weight, HUNDRED_GRAMS))
        });

        returnTotal &&
            returnTotal(total);
    }, [total, returnTotal]);

    useEffect(() => {
        returnHundredGrams &&
            returnHundredGrams(hundredGrams);
    }, [hundredGrams, returnHundredGrams]);

    const addListItem = (value) => {
        setList([...list, options.find(c => c.id === value)]);
    }

    const removeListItem = (value) => {
        setList([...list.filter(l => l.id !== value)]);
    }

    const renderTag = ({ label, value, closable, onClose, onPreventMouseDown }) => {
        return (
            <Tag
                color='default'
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                style={{ margin: '3px', fontSize: '14px', fontWeight: '600' }}
            >
                {label !== value ? label
                    :
                    <>
                        {list.find(c => c.id === label).title}
                        <small> (был удален)</small>
                    </>
                }
            </Tag>
        )
    }

    return (
        <>
            {isEdit &&
                <Controller
                    control={control}
                    name={selectName}
                    rules={{ required: 'Это поле обязательно' }}
                    render={({
                        field: { name, value, onChange },
                        formState: { errors }
                    }) => (
                        <>
                            <Select
                                value={value}
                                onChange={onChange}
                                mode='multiple'
                                showSearch
                                style={{ width: '100%' }}
                                optionFilterProp="children"
                                onDeselect={removeListItem}
                                onSelect={addListItem}
                                placeholder='Выберите ингредиенты из списка'
                                tagRender={renderTag}
                            >
                                {options.map(c => <Option key={c.id} value={c.id}>{c.title}</Option>)}
                            </Select>
                            {errors[name] && <span style={styles.error}>{errors[name].message}</span>}
                        </>
                    )}
                />
            }

            {!list.length
                ?
                    <div className={styles.empty}>
                        Ничего еще не добавлено
                    </div>
                :
                    <table className={`${styles.table} ${styles[theme]}`}>
                        <thead>
                            <tr>
                                <td>Ингредиент</td>
                                <td>Вес, гр</td>
                                <td>Калорий, ккал</td>
                                <td>Белков, гр</td>
                                <td>Жиров, гр</td>
                                <td>Углеводов, гр</td>
                            </tr>
                        </thead>

                        <tbody>
                            {list.map(item =>
                                <FoodItem
                                    setList={setList}
                                    key={item.id}
                                    item={item}
                                    list={list}
                                    isEdit={isEdit}
                                />
                            )}
                        </tbody>

                        <tfoot>
                            <tr>
                                <td>Итого:</td>
                                <td>{total.weight}</td>
                                <td>{total.kcal}</td>
                                <td>{total.squirrels}</td>
                                <td>{total.fats}</td>
                                <td>{total.carbohydrates}</td>
                            </tr>
                            {showHundredGrams &&
                                <tr>
                                    <td>Итого на 100 грамм:</td>
                                    <td>{hundredGrams.weight}</td>
                                    <td>{hundredGrams.kcal}</td>
                                    <td>{hundredGrams.squirrels}</td>
                                    <td>{hundredGrams.fats}</td>
                                    <td>{hundredGrams.carbohydrates}</td>
                                </tr>
                            }
                        </tfoot>
                    </table>
            }
        </>
    )
}

export default FoodTable;