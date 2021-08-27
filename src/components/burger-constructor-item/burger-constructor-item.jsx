import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDrop, useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';

import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { changeIngredientsOrder } from '../../services/actions/constructor-action';
import styles from './burger-constructor-item.module.css';

const BurgerConstructorItem = ({ uniqueId, index, _id, price, name, image, deleteItem }) => {
    const ref = useRef(null);
    const dispatch = useDispatch(); 
    const moveIngredient = (dragIndex, hoverIndex) => {
        dispatch(changeIngredientsOrder( dragIndex, hoverIndex))
    };

    const [, drop] = useDrop({
        accept: 'constructor-ingredient',
        hover(item, monitor) {
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
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
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
                    style={{opacity}}
                    text={name}
                    price={price}
                    thumbnail={image}
                    handleClose={() => deleteItem(uniqueId)}
                />
            </div>
    )
}

BurgerConstructorItem.propTypes = {
    uniqueId: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    deleteItem: PropTypes.func.isRequired,
    }

export default BurgerConstructorItem;