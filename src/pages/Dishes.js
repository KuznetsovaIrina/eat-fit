import React, { useState } from 'react';
import { Button } from 'antd';
import DrawerForm from './../components/DrawerForm'
import List from './../components/dishes/List';
import Form from './../components/dishes/Form';
import { connect } from 'react-redux';
import { addDish, updateDish, removeDish } from './../redux/dishes-reducer'
import { addIngredient } from './../redux/ingredients-reducer'
import { getAllIngredientsWithDefaultWeight } from './../redux/ingredients-selector'


const Dishes = ({allIngredients, dishes, addDish, updateDish, removeDish, addIngredient}) => {
    const [visible, setVisible] = useState(false);

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
    allIngredients: getAllIngredientsWithDefaultWeight(state),
    dishes: state.dishes.dishes
})

export default connect(mapStateToProps, {
    addDish,
    updateDish,
    removeDish,
    addIngredient
})(Dishes);