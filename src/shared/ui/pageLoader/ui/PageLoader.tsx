import styles from './PageLoader.module.scss';
import {FC} from 'react';
import {Loader} from 'src/shared/ui/Loader';

interface PageLoaderProps {}

export const PageLoader: FC<PageLoaderProps> = ({}) => {
    return (
        <div className={styles.wrapper}>
            <Loader width={80} height={80} />
        </div>
    );
};
