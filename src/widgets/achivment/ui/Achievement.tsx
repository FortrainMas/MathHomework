import styles from './Achivment.module.scss';
import {FC} from 'react';
import {Achievement as ach} from 'src/entities/User/userModel.ts';

export const Achievement: FC<ach> = ({title, image}) => {
    return (
        <div className={styles.achivment}>
            <div className={styles.header}>{title}</div>
            <img
                src={`./achievements/${image}.png`}
                alt="Аватарка"
                className={styles.achievmentImage}
            />
        </div>
    );
};
