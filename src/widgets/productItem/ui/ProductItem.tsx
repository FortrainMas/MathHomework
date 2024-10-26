import styles from './ProductItem.module.scss';
import {useAppDispatch} from 'src/shared/utils/hooks/redux.ts';
import {buyProductThunk} from 'src/entities/Products/productsThunks.ts';

interface ProductItemProps {
    id: number;
    name: string;
    price: number;
    already_bought: boolean;
    description: string;
}

export const ProductItem = ({
    name,
    price,
    already_bought,
    id,
    description,
}: ProductItemProps) => {
    const dispatch = useAppDispatch();

    const handleClick = (id: number) => {
        dispatch(buyProductThunk({id}));
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.name}>
                <div>{name}</div>
                {description?.length && (
                    <div className={styles.description}>{description}</div>
                )}
            </div>
            <div className={styles.price}>{price} монет</div>
            <button disabled={already_bought} onClick={() => handleClick(id)}>
                {already_bought ? 'Куплено' : 'Купить'}
            </button>
        </div>
    );
};
