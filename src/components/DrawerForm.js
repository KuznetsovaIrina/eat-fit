import React from 'react';
import { Drawer } from 'antd';

const DrawerForm = ({title, visible, close, children}) => {
    return (
        <Drawer
            title={title}
            placement='top'
            onClose={close}
            visible={visible}
            size='large'
            destroyOnClose={true}
        >
            {children}
        </Drawer>
    )
}

export default DrawerForm;