import React, { useState } from 'react';
import styles from './ingredients.module.scss';
import Item from './Item';
import Form from './Form';
import DrawerForm from '../DrawerForm';

const List = ({ingredients, remove, edit}) => {
    const [visible, setVisible] = useState(false);
    const [editableObj, setEditableObj] = useState({});

    const openEdit = (ingredient) => {
        setEditableObj(ingredient);
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
                />
            }

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
                    {ingredients.map(i =>
                        <Item
                            openEdit={openEdit}
                            key={i.id}
                            ingredient={i}
                            remove={remove}
                        />
                    )}
                </tbody>
            </table>
        </>
    )
}

export default List;