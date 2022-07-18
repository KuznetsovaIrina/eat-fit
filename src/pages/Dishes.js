import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { addDish, updateDish, removeDish, fetchDishes } from './../redux/dishes-reducer';
import { addIngredient } from './../redux/ingredients-reducer';
import { getAllIngredientsWithDefaultWeight } from './../redux/selectors';
import DrawerForm from './../components/DrawerForm';
import List from './../components/dishes/List';
import Form from './../components/dishes/Form';
import Loader from './../components/Loader';

const Dishes = ({
    allIngredients,
    dishes,
    addDish,
    updateDish,
    removeDish,
    addIngredient,
    fetchDishes,
    loading
}) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        fetchDishes();
    }, [fetchDishes]);

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
            
            {loading ? <Loader small={true} /> :
                <List
                    dishes={dishes}
                    remove={removeDish}
                    edit={updateDish}
                    allIngredients={allIngredients}
                    addIngredient={addIngredient}
                />
            }
        </>
    )
}

const mapStateToProps = (state) => ({
    allIngredients: getAllIngredientsWithDefaultWeight(state),
    dishes: state.dishes.dishes,
    loading: state.dishes.loading
})

export default connect(mapStateToProps, {
    addDish,
    updateDish,
    removeDish,
    addIngredient,
    fetchDishes
})(Dishes);