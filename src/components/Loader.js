import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const icon = (
    <LoadingOutlined
        style={{ fontSize: 52 }}
        spin
    />
);

const Loader = () => {
    return (
        <div className='loader'>
            <Spin indicator={icon} />
        </div>
    )
}

export default Loader;