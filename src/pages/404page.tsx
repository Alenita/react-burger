import React from 'react';
import { Link } from 'react-router-dom';
import styles from './not-found-page.module.css';

export const NotFound404 = () => {
    return (
        <div className={styles.container}>
            <p className='text text_type_main-medium'>
                Такой страницы не существует. Вы можете вернуться на&nbsp;
                <Link className={styles.link} to='/'>главную</Link>.
            </p>
        </div>
    )
}