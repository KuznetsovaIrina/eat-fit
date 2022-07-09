import React from 'react';
import { Drawer } from 'antd';

const DrawerForm = ({visible, close, Form, edit, add, data = {}, title}) => {
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
                close={close}
                data={data}
            />
        </Drawer>
    )
}

export default DrawerForm;