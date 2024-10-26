import styles from './New.module.scss';
import {FC, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { resetNew } from 'src/entities/News/newsSlice';
import { getNewByIdThunk } from 'src/entities/News/newsThunks';
import { useAppDispatch, useAppSelector } from 'src/shared/utils/hooks/redux';

interface NewProps {
    header: string;
    main: string;
    id: number;
}

export const New: FC<NewProps> = ({header, id}) => {
    const newItem = useAppSelector(state => state.news.currentNew);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getNewByIdThunk(id));
        return () => {
            dispatch(resetNew());
        };
    }, []);

    return (
        <div className={styles.new}>
            <div className={styles.header}>
                {header}
            </div>
            <div className={styles.main}>
                {newItem?.text}
            </div>
        </div>
    );
};
