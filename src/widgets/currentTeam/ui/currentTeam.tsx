import styles from './currentTeam.module.scss';
import {FC} from 'react';

interface CurrentTeamProps {
    name: string;
    balance: number;
    copilot: string;
}

export const CurrentTeam: FC<CurrentTeamProps> = ({name, balance, copilot}) => {
    return (
        <div className={styles.wrapper}>
            <p className={styles.name}>
                Команда: <span>{name}</span>
            </p>
            <p className={styles.copilot}>Напарник: {copilot}</p>
            <p className={styles.balance}>Баланс: {balance}</p>
        </div>
    );
};
