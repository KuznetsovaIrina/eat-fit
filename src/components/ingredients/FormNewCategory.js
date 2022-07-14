import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Typography, Space } from 'antd';
import { Input, message } from 'antd';

const FormANewCategory = ({
    addCategory
}) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState(false);

    const add = () => {
        if (title.trim().length) {
            addCategory({ title: title.trim() });
            setError(false);
        } else {
            message.error('Нужно заполнить поле');
            setError(true);
        }
        
        setTitle('');
    }

    return (
        <Space style={{ padding: '10px' }}>
            <Input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder='Название'
                status={error ? 'error' : ''}
            />
            <Typography.Link onClick={add}>
                <PlusOutlined /> Добавить
            </Typography.Link>
        </Space>
    )
}

export default FormANewCategory;