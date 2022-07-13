import React, { useState } from 'react';
import Item from './Item';
import Form from './Form';
import styles from './Dishes.module.scss';
import DrawerForm from '../DrawerForm';

const List = ({dishes, remove, edit, allIngredients, addIngredient}) => {
    const [visible, setVisible] = useState(false);
    const [editableObj, setEditableObj] = useState({});

    const openEdit = (object) => {
        setEditableObj(object);
        setVisible(true);
    }

    const closeEdit = () => {
        setEditableObj({});
        setVisible(false);
    }

    return (
        <>
            <DrawerForm
                title='Редактировать'
                close={closeEdit}
                visible={visible}
            >
                <Form
                    edit={edit}
                    close={closeEdit}
                    data={editableObj}
                    allIngredients={allIngredients}
                    addIngredient={addIngredient}
                />
            </DrawerForm>

            <ul className={styles.list}>
                {dishes.map(dish =>
                    <Item
                        key={dish.id}
                        dish={dish}
                        openEdit={openEdit}
                        remove={remove}
                    />
                )}
            </ul>
        </>
    )
}

export default List;