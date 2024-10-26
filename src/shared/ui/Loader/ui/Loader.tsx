import styles from './Loader.module.scss';
import {FC} from 'react';
import loader from 'src/shared/assets/svg/load.svg';

interface LoaderProps {
    height?: number;
    width?: number;
}

export const Loader: FC<LoaderProps> = ({width = 30, height = 30}) => {
    return (
        <div className={styles.wrapper}>
            <img src={loader} alt="Загрузка..." width={width} height={height} />
        </div>
    );
};
