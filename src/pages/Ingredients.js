import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
    addIngredient,
    removeIngredient,
    updateIngredient,
    addCategory,
    setIngredients
} from './../redux/ingredients-reducer';
import Form from './../components/ingredients/Form';
import List from './../components/ingredients/List';
import Categories from './../components/ingredients/Categories';
import DrawerForm from '../components/DrawerForm';
import { Button, Space } from 'antd';


const Ingredients = ({
    isAdmin,
    categories,
    ingredients,
    addIngredient,
    removeIngredient,
    updateIngredient,
    addCategory,
    setIngredients
}) => {
    const [visible, setVisible] = useState(false);
    const [currentCategory, setCurrentCategory] = useState('user');

    const onClose = (categoryId, isSubmit) => {
        if (categoryId && isSubmit) {
            setCurrentCategory(categoryId);
            setIngredients(categoryId);
        }
        
        setVisible(false)
    }

    return (
        <>  
            <Categories
                categories={categories}
                setIngredients={setIngredients}
                setCurrentCategory={setCurrentCategory}
                currentCategory={currentCategory}
            />
            
            <Space>
                <Button
                    type='primary'
                    size='large'
                    onClick={() => setVisible(true)}
                >
                    Добавить
                </Button>
                {isAdmin &&
                    <Button onClick={() => console.log(currentCategory)}>
                        Выгрузить из json
                    </Button>
                }
            </Space>
            
            <DrawerForm
                visible={visible}
                Form={Form}
                add={addIngredient}
                close={onClose}
                title='Добавить'
                isAdmin={isAdmin}
                addCategory={addCategory}
                categories={categories}
            />
            
            <List
                ingredients={ingredients}
                remove={removeIngredient}
                edit={updateIngredient}
                isAdmin={isAdmin}
                addCategory={addCategory}
                categories={categories}
                currentCategory={currentCategory}
            />
        </>
    )
}

const mapStateToProps = (state) => ({
    ingredients: state.ingredients.ingredients,
    categories: state.ingredients.categories,
    isAdmin: state.auth.user.isAdmin
})

export default connect(mapStateToProps, {
    addIngredient,
    removeIngredient,
    updateIngredient,
    addCategory,
    setIngredients
})(Ingredients);