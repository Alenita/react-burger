import React from 'react';
import styles from './orders-queue.module.css';
import { useSelector } from '../../services/hooks';

interface IItem {
    ingredients: string[],
    name: string,
    _id: string,
    status: 'done' | 'pending' | 'created';
    number: number,
    createdAt: string,
    updatedAt: string
}

export const OrdersQueue = () => {
    const { feedOrders, total, totalToday } = useSelector(state => state.wsStore)
    const doneOrders: IItem[] = feedOrders?.filter(item => item.status==="done")
    const pendingOrders: IItem[] = feedOrders?.filter(item => item.status==="pending")
    
    return (
        <section className={styles.container}>
            <div className={styles.statusColumns}>
                <div className={styles.column}>
                    <p className="text text_type_main-medium">
                        Готовы:
                    </p>
                    <ul className={styles.numbers} style={{color: '#00CCCC'}}>
                        <div className={styles.numbersColumn}>
                            {doneOrders &&  doneOrders.slice(0,5).map((item) => 
                                    <li className="text text_type_digits-default" key={item._id} >{item.number}</li>
                            )}
                        </div>
                        <div className={styles.numbersColumn}>
                            {doneOrders.length > 5 && 
                                doneOrders?.slice(5,10).map((item) => 
                                    <li className="text text_type_digits-default" key={item._id} >{item.number}</li>
                            )}
                        </div>
                    </ul>
                </div>
                <div className={styles.column}>
                    <p className="text text_type_main-medium">
                        В работе:
                    </p>
                    <ul className={styles.numbers}>
                        {pendingOrders?.slice(0,5).map((item) => 
                            <li className="text text_type_digits-default" key={item._id} >{item.number}</li>
                        )} 
                        {pendingOrders.length > 5 && 
                            pendingOrders?.slice(5,10).map((item) => 
                                <li className="text text_type_digits-default" key={item._id} >{item.number}</li>
                        )}
                    </ul>
                </div>
            </div>
            <div className={styles.block}>
                <p className="text text_type_main-medium">
                    Выполнено за все время:
                </p>
                <p className={`${styles.total} text text_type_digits-large`}>
                        {total}
                </p>
            </div>
            <div className={styles.block}>
                <p className='text text_type_main-medium'>
                    Выполнено за сегодня:
                </p>
                <p className={`${styles.total} text text_type_digits-large`}>
                    {totalToday}
                </p>
            </div>
        </section>
    )
};