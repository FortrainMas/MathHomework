import styles from './NewPage.module.scss';
import {useAppDispatch, useAppSelector} from 'src/shared/utils/hooks/redux.ts';
import {useEffect} from 'react';
import {getNewByIdThunk} from 'src/entities/News/newsThunks.ts';
import {Loader} from 'src/shared/ui/Loader';
import {resetNew} from 'src/entities/News/newsSlice.ts';
import FormattedMessage from 'src/shared/ui/formatted-message/FormattedMessage.tsx';

export const NewPage = () => {
    const newItem = useAppSelector(state => state.news.currentNew);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const id = +window.location.pathname.replace('/news/', '');

        dispatch(getNewByIdThunk(id));
        return () => {
            dispatch(resetNew());
        };
    }, []);

    return (
        <>
            <div className={styles.curTaskFull}>
                <div className={styles.description}>
                    {newItem ? (
                        <FormattedMessage>{newItem.text}</FormattedMessage>
                    ) : (
                        <Loader height={50} width={50} />
                    )}
                </div>
            </div>
        </>
    );
};
