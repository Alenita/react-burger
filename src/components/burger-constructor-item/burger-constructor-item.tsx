import React, { useRef, FC } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { useDispatch } from '../../services/hooks';

import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { changeIngredientsOrder } from '../../services/actions/constructor-action';
import styles from './burger-constructor-item.module.css';

interface IBurgerConstructorItem {
    uniqueId: string,
    index: number,
    _id: string,
    price: number,
    name: string,
    image: string,
    deleteItem: (id: string) => void
}

interface IItem {
    index: number,
    id: string,
    type: string,
}

const BurgerConstructorItem: FC<IBurgerConstructorItem> = ({ uniqueId, index, _id, price, name, image, deleteItem }) => {
    const ref = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch(); 
    const moveIngredient = (dragIndex: number, hoverIndex: number) => {
        dispatch(changeIngredientsOrder( dragIndex, hoverIndex))
    };

    const [, drop] = useDrop({
        accept: 'constructor-ingredient',
        hover(item: IItem, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset && clientOffset.y - hoverBoundingRect.top;
            if (hoverClientY && dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (hoverClientY && dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveIngredient(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [isDragging, drag] = useDrag({
        type: 'constructor-ingredient',
        item: { type: 'constructor-ingredient', name, index, image, price, _id, uniqueId },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    return (
            <div ref={ref} className={styles.elementWithDragIcon} >
                <DragIcon type="primary" />
                <ConstructorElement
                    data-test-id='constructor-ingredient'
                    text={name}
                    price={price}
                    thumbnail={image}
                    handleClose={() => deleteItem(uniqueId)}
                />
            </div>
    )
}

export default BurgerConstructorItem;