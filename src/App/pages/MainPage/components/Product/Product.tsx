import { Button, Table } from '@mantine/core';
import { useEffect, useState } from 'react';
import Rating from './components/Rating';
import Graph from './components/Graph';

import styles from './Product.module.scss';


const Product = () => {
    const [activeBtn, setActiveBtn] = useState('rating');

    return (
        <div className={styles.product}>
            {
                activeBtn === "rating" ? <Rating /> : <Graph />
            }
            <div className={styles['product-nav-btn']}>
                <Button
                    variant={activeBtn === 'rating' ? 'filled' : 'transparent'}
                    onClick={() => setActiveBtn('rating')}
                >
                    Рейтинг продуктов
                </Button>
                <Button
                    variant={activeBtn !== 'rating' ? 'filled' : 'transparent'}
                    onClick={() => setActiveBtn('graph')}
                >
                    Анализ продуктов
                </Button>
            </div>
        </div>
    )
}

export default Product;