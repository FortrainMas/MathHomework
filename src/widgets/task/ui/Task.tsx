import {Link} from 'react-router-dom';
import styles from './Task.module.scss';
import FormattedMessage from 'src/shared/ui/formatted-message/FormattedMessage.tsx';

interface ProfileProps {
    title: string;
    points: string;
    status: string;
    id: number;
}

export const Task = ({title, status, points, id}: ProfileProps) => {
    return (
        <div className={styles.task}>
            <div className={styles.container}>
                {status === 'AVAILABLE' ? (
                    <Link to={`/task/${id}`} className={styles.taskHeader}>
                        <span>{title}</span>
                    </Link>
                ) : (
                    <div className={styles.taskHeader}>
                        <span>{title}</span>
                    </div>
                )}
                <hr className={styles.hr} />
                <div className={styles.taskStatus}>{status}</div>
                {status === 'AVAILABLE' && (
                    <div className={styles.taskPrice}>Цена: {points}</div>
                )}
            </div>
        </div>
    );
};
