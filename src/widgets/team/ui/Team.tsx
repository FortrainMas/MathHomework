import styles from './Team.module.scss';
import {FC} from 'react';

interface TeamProps {
    name: string;
    score: number;
    position: number;
}

export const Team: FC<TeamProps> = ({name, score, position}) => {
    return (
        <div className={styles.team}>
            <div className={styles.name}>{`${position}.${name}`}</div>
            <div className={styles.balance}>Score: {score}</div>
        </div>
    );
};
