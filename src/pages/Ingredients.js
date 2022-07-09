import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addIngredient, removeIngredient, updateIngredient } from './../redux/ingredients-reducer';
import Form from './../components/ingredients/Form';
import List from './../components/ingredients/List';
import DrawerForm from '../components/DrawerForm';
import { Button } from 'antd';

const Ingredients = ({ ingredients, addIngredient, removeIngredient, updateIngredient }) => {
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
                add={addIngredient}
                close={() => setVisible(false)}
                title='Добавить'
            />
            
            <List
                ingredients={ingredients}
                remove={removeIngredient}
                edit={updateIngredient}
            />
        </>
    )
}

const mapStateToProps = (state) => ({
    ingredients: state.ingredients.ingredients,
})

export default connect(mapStateToProps, { addIngredient, removeIngredient, updateIngredient })(Ingredients);