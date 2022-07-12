import React, { useState } from 'react';
import Item from './Item';
import Form from './Form';
import DrawerForm from '../DrawerForm';
import styles from './Dishes.module.scss';

const List = ({dishes, remove, edit, categories, addIngredient}) => {
    const [visible, setVisible] = useState(false);
    const [editableObj, setEditableObj] = useState({});

    const openEdit = (dish) => {
        setEditableObj(dish);
        setVisible(true);
    }

    const closeEdit = () => {
        setEditableObj({});
        setVisible(false);
    }

    return (
        <>
            {visible &&
                <DrawerForm
                    visible={visible}
                    Form={Form}
                    edit={edit}
                    data={editableObj}
                    close={closeEdit}
                    categories={categories}
                    addIngredient={addIngredient}
                />
            }

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