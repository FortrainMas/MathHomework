import { AxiosError } from 'axios';
import styles from './New.module.scss';
import {FC, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { resetNew } from 'src/entities/News/newsSlice';
import { getNewByIdThunk } from 'src/entities/News/newsThunks';
import { getNew, getNews } from 'src/shared/api/ApiCalls';
import { getErrorMessage } from 'src/shared/utils/api';
import { useAppDispatch, useAppSelector } from 'src/shared/utils/hooks/redux';
import { BackendError } from 'src/app/types/global';

interface NewProps {
    header: string;
    main: string;
    id: number;
}

type NewsDetail = {
    details: {
        id: number;
        publicationTime: string;
        shortText: string;
        title: string;
    };
    text: string;
};

export const New: FC<NewProps> = ({header, id}) => {
    const [newsDetail, setNewsDetail] = useState<NewsDetail | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchNewsDetail = async () => {
            try {
                const res = await getNew(id);
                setNewsDetail(res.data.content);
            } catch (e: unknown) {
                const errorMessage = getErrorMessage(e as AxiosError<BackendError>);
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchNewsDetail();
    }, [id]);


    if(loading || error){
        return(<div className={styles.new}>
            <div className={styles.header}>
                {header}
            </div>
            <div className={styles.main}>
                Грузим новость
            </div>
        </div>);
    }

    return (
        <div className={styles.new}>
            <div className={styles.header}>
                {header}
            </div>
            <div className={styles.main}>
                <p>{newsDetail?.text}</p>
            </div>
        </div>
    );
};
