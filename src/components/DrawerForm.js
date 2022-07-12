import React from 'react';
import { Drawer } from 'antd';

const DrawerForm = ({
    isAdmin,
    visible,
    close,
    Form,
    edit,
    add,
    data = {},
    title,
    addCategory,
    addIngredient,
    categories
}) => {
    return (
        <Drawer
            title={title}
            placement='top'
            onClose={close}
            visible={visible}
            size='large'
        >
            <Form
                edit={edit}
                add={add}
                addCategory={addCategory}
                close={close}
                data={data}
                isAdmin={isAdmin}
                categories={categories}
                addIngredient={addIngredient}
            />
        </Drawer>
    )
}

export default DrawerForm;