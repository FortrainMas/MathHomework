import styles from './PotentialTeammate.module.scss';
import {Invite} from 'src/entities/Team/teamModel.ts';
import {useAppDispatch} from 'src/shared/utils/hooks/redux.ts';
import {acceptInviteThunk} from 'src/entities/Team/teamThunks.ts';

export const PotentialTeammate = ({
    userFrom: {email, username},
    id,
}: Invite) => {
    const dispatch = useAppDispatch();

    return (
        <div className={styles.cunt}>
            <div className={styles.nick}>{username}</div>
            <div className={styles.balance}>8000</div>
            <div className={styles.email}>{email}</div>
            <button
                className={styles.butt}
                onClick={() =>
                    dispatch(acceptInviteThunk({id, action: 'ACCEPT'}))
                }>
                Беру
            </button>
            <button
                className={styles.butt}
                onClick={() =>
                    dispatch(acceptInviteThunk({id, action: 'CANCEL'}))
                }>
                Отклоняю
            </button>
        </div>
    );
};
