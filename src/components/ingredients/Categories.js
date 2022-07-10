import React from 'react';
import { Radio } from 'antd';
import styles from './ingredients.module.scss';

const Categories = ({categories, setIngredients, currentCategory, setCurrentCategory}) => {
    const onChange = (e) => {
        setIngredients(e.target.value);
        setCurrentCategory(e.target.value);
    }

    return (
        <>
            <div className={styles.filter}>
                <Radio.Group onChange={onChange} value={currentCategory}>
                    <Radio.Button value="user">Мои</Radio.Button>

                    {categories.map(category =>
                        <Radio.Button key={category.id} value={category.id}>
                            {category.title}
                        </Radio.Button>
                    )}
                </Radio.Group>
            </div>
        </>
    )
}

export default Categories;