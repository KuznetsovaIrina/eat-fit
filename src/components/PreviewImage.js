import React, { useState } from 'react';
import { Input } from 'antd';
import styles from './../assets/styles/modules/PreviewImage.module.scss';

const PreviewImage = ({
    url,
    setImageURL
}) => {
    const [value, setValue] = useState(url);

    const onChange = e => {
        setValue(e.target.value);
        setImageURL(e.target.value);
    }

    return (
        <>
            <div
                className={styles.preview}
                style={{ backgroundImage: `url(${value})` }}
            />
            <Input
                placeholder='Ссылка на изображение'
                value={value}
                onChange={onChange}
            />
        </>
    )
}

export default PreviewImage;