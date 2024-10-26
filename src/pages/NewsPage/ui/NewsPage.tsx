import styles from './News.module.scss';
import {New} from 'src/widgets/new/ui/New.tsx';
import {useAppDispatch, useAppSelector} from 'src/shared/utils/hooks/redux.ts';
import {useEffect} from 'react';
import {getNewsThunk} from 'src/entities/News/newsThunks.ts';

export const NewsPage = () => {
    const dispatch = useAppDispatch();
    const news = useAppSelector(state => state.news.news);

    useEffect(() => {
        dispatch(getNewsThunk());
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.listOfTasks}>
                <div className={styles.header}>
                    <div className={styles.stageSwitcher}>
                        <p className={styles.switchText}>News</p>
                    </div>
                </div>
                <div className={styles.taskBorder}></div>
                <div className={styles.scroll}>
                    {news.length ? (
                        news.map(item => (
                            <New
                                id={item.id}
                                key={item.id}
                                header={item.title}
                                main={item.publicationTime}
                            />
                        ))
                    ) : (
                        <div>Новостей нет!</div>
                    )}
                </div>
            </div>
        </div>
    );
};
