import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const icon = (
    <LoadingOutlined
        style={{ fontSize: 52 }}
        spin
    />
);

const styles = {
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}

const Loader = ({
    small
}) => {
    return (
        <>
        {small
        ?
            <div style={styles}>
                <Spin />
            </div>
        :
            <div className='loader'>
                <Spin indicator={icon} />
            </div>}
        </>
    )
}

export default Loader;