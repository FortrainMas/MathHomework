import styles from './ShopPage.module.scss';
import {ProductItem} from 'src/widgets/productItem/ui/ProductItem.tsx';
import {useAppDispatch, useAppSelector} from 'src/shared/utils/hooks/redux.ts';
import {useEffect} from 'react';
import {
    getProducts,
    getUserBalanceThunk,
} from 'src/entities/Products/productsThunks.ts';
import {Loader} from 'src/shared/ui/Loader';

interface ShopPageProps {}

export const ShopPage = ({}: ShopPageProps) => {
    const products = useAppSelector(state => state.products.products);
    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.products.status);
    const balance = useAppSelector(state => state.products.balance);

    useEffect(() => {
        if (products.length === 0) dispatch(getProducts());
        if (!balance) dispatch(getUserBalanceThunk());
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.taskTitle}>Магазин</div>
                    <div className={styles.taskTitle}>Баланс: {balance}</div>
                </div>
                <div className={styles.border}></div>
                <div className={styles.content}>
                    {status === 'idle'
                        ? products.map(product => {
                              return (
                                  <ProductItem
                                      id={product.id}
                                      name={product.name}
                                      price={product.price}
                                      already_bought={product.already_bought}
                                      description={product.description}
                                  />
                              );
                          })
                        : null}
                    {status === 'idle' && products.length === 0 ? (
                        <div className={styles.empty}>Магазин пуст</div>
                    ) : null}
                    {status === 'loading' && <Loader height={200} />}
                </div>
            </div>
        </div>
    );
};
