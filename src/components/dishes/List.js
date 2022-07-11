import React from 'react';
import Item from './Item';
import styles from './Dishes.module.scss';

const List = ({dishes}) => {
    return (
        <ul className={styles.list}>
            {dishes.map(dish => <Item key={dish.id} dish={dish} />)}
        </ul>
    )
}

export default List;