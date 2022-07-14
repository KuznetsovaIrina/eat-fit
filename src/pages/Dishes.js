import React, { useState } from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { addDish, updateDish, removeDish } from './../redux/dishes-reducer';
import { addIngredient } from './../redux/ingredients-reducer';
import { getAllIngredientsWithDefaultWeight } from './../redux/selectors';
import DrawerForm from './../components/DrawerForm';
import List from './../components/dishes/List';
import Form from './../components/dishes/Form';

const Dishes = ({allIngredients, dishes, addDish, updateDish, removeDish, addIngredient}) => {
    const [visible, setVisible] = useState(false);

    const onClose = () => {
        setVisible(false)
    }

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
                title='Добавить'
                close={onClose}
                visible={visible}
            >
                <Form
                    add={addDish}
                    close={onClose}
                    allIngredients={allIngredients}
                    addIngredient={addIngredient}
                />
            </DrawerForm>
            
            <List
                dishes={dishes}
                remove={removeDish}
                edit={updateDish}
                allIngredients={allIngredients}
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