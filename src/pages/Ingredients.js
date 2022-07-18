import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Form from './../components/ingredients/Form';
import List from './../components/ingredients/List';
import Categories from './../components/ingredients/Categories';
import DrawerForm from './../components/DrawerForm';
import { Button, Space } from 'antd';
import { USER_CATEGORY_INGREDIENTS } from './../util/helpers';
import {
    addIngredient,
    removeIngredient,
    updateIngredient,
    addCategory,
    setIngredients,
    setIngredientsAC
} from './../redux/ingredients-reducer';

const Ingredients = ({
    isAdmin,
    categories,
    ingredients,
    addIngredient,
    removeIngredient,
    updateIngredient,
    addCategory,
    setIngredients,
    loading
}) => {
    const [visible, setVisible] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(USER_CATEGORY_INGREDIENTS);

    useEffect(() => {
        setIngredients(currentCategory);
    }, [currentCategory, setIngredients]);

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
                {isAdmin && <Button onClick={() => console.log(currentCategory)}>Выгрузить из json</Button>}
            </Space>

            <DrawerForm
                title='Добавить'
                close={onClose}
                visible={visible}
            >
                <Form
                    add={addIngredient}
                    categories={categories}
                    addCategory={addCategory}
                    close={onClose}
                    isAdmin={isAdmin}
                />
            </DrawerForm>

            <List
                ingredients={ingredients}
                remove={removeIngredient}
                edit={updateIngredient}
                isAdmin={isAdmin}
                addCategory={addCategory}
                categories={categories}
                currentCategory={currentCategory}
                loading={loading}
            />
        </>
    )
}

const mapStateToProps = (state) => ({
    ingredients: state.ingredients.ingredients,
    categories: state.ingredients.categories,
    loading: state.ingredients.loading,
    isAdmin: state.auth.user.isAdmin,
})

export default connect(mapStateToProps, {
    addIngredient,
    removeIngredient,
    updateIngredient,
    addCategory,
    setIngredients,
    setIngredientsAC
})(Ingredients);