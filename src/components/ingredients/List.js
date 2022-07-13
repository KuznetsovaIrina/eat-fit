import React, { useState } from 'react';
import styles from './ingredients.module.scss';
import Item from './Item';
import Form from './Form';
import DrawerForm from '../DrawerForm';

const List = ({isAdmin, addCategory, categories, ingredients, remove, edit, currentCategory}) => {
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
                    categories={categories}
                    addCategory={addCategory}
                    isAdmin={isAdmin}
                />
            </DrawerForm>

            <table className={styles.list}>
                <thead>
                    <tr>
                        <td>Название</td>
                        <td>Калорий</td>
                        <td>Белков</td>
                        <td>Жиров</td>
                        <td>Углеводов</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {ingredients.map((i, index) =>
                        <Item
                            index={index}
                            openEdit={openEdit}
                            key={i.id}
                            ingredient={i}
                            remove={remove}
                            isAdmin={isAdmin}
                            currentCategory={currentCategory}
                        />
                    )}
                </tbody>
            </table>
        </>
    )
}

export default List;