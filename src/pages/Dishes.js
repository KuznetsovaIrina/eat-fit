import React, { useState } from 'react';
import { Button } from 'antd';
import DrawerForm from './../components/DrawerForm'
import List from './../components/dishes/List';
import Form from './../components/dishes/Form';
import { connect } from 'react-redux';
import {
    addDish,
    updateDish,
    removeDish
} from './../redux/dishes-reducer'
import { addIngredient } from './../redux/ingredients-reducer'


const Dishes = ({categories, ingredients, dishes, addDish, updateDish, removeDish, addIngredient}) => {
    const [visible, setVisible] = useState(false);
    
    const allIngredients = [];
    ingredients.map(i => allIngredients.push({...i, category: 'user', weight: 100}));
    categories.map(c => 
        Object.keys(c.ingredients).map(id => allIngredients.push({...c.ingredients[id], id, weight: 100}))
    );

    return (
        <>
            <Button
                type='primary'
                size='large'
                onClick={() => setVisible(true)}
            >
                Добавить
            </Button>
            
            <DrawerForm
                visible={visible}
                Form={Form}
                close={() => setVisible(false)}
                title='Добавить'
                categories={allIngredients}
                add={addDish}
                addIngredient={addIngredient}
            />
            
            <List
                dishes={dishes}
                remove={removeDish}
                edit={updateDish}
                categories={allIngredients}
                addIngredient={addIngredient}
            />
        </>
    )
}

const mapStateToProps = (state) => ({
    ingredients: state.ingredients.ingredients,
    categories: state.ingredients.categories,
    dishes: state.dishes.dishes
})

export default connect(mapStateToProps, {
    addDish,
    updateDish,
    removeDish,
    addIngredient
})(Dishes);