import styles from './Ratings.module.scss';
import {New} from 'src/widgets/new/ui/New.tsx';
import {useAppDispatch, useAppSelector} from 'src/shared/utils/hooks/redux.ts';
import {useEffect} from 'react';
import {getNewsThunk} from 'src/entities/News/newsThunks.ts';
import { getTeamsRatingThunks } from 'src/entities/Rating/ratingThunks';
import { Loader } from 'src/shared/ui/Loader';

export const RatingsPage = () => {
    const rating = useAppSelector(state => state.rating.rating);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTeamsRatingThunks());
    }, []);
    console.log(rating)

    return (
        <div className={styles.wrapper}>
            <div className={styles.listOfTasks}>
                <div className={styles.header}>
                    <div className={styles.stageSwitcher}>
                        <p className={styles.switchText}>Рейтинг</p>
                    </div>
                </div>
                <div className={styles.taskBorder}></div>
                <div className={styles.scroll}>
                    {rating.length?(
                        <div>
                            {rating.map((item, key) => (
                                <div className={styles.ratingItem} key={key}>
                                    <h1>{item.name}</h1>
                                    <h1>{item.score}</h1>
                                </div>
                                ))
                            }                   
                        </div>
                    ):(
                        <Loader />
                    )
                    }
                </div>
            </div>
        </div>
    );
};
