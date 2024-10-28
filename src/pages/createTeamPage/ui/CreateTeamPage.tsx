import styles from './CreateTeamPage.module.scss';
import {PotentialTeammate} from 'src/widgets/potentialTeammate';
import {useAppDispatch, useAppSelector} from 'src/shared/utils/hooks/redux.ts';
import {ChangeEvent, useEffect, useState} from 'react';
import {
    getInvitationsThunk,
    inviteUserThunk,
} from 'src/entities/Team/teamThunks.ts';
import {
    getStageInfoThunk,
} from 'src/entities/Task/taskThunks.ts';
import {useNavigate} from 'react-router-dom';
import { STAGES } from 'src/entities/Task/taskModel';

// type FormValues = {
//     email: string;
// };

export const CreateTeamPage = () => {
    const dispatch = useAppDispatch();

    const invitations = useAppSelector(state => state.team.invitations);
    const show = useAppSelector(state => state.team.show);
    const team = useAppSelector(state => state.team.teamInfo);
    const stage = useAppSelector(state => state.tasks.currentStage);

    const [email, setEmail] = useState('');

    useEffect(() => {
        dispatch(getInvitationsThunk());
        dispatch(getStageInfoThunk());
    }, []);

    const handleSubmit = () => {
        dispatch(inviteUserThunk(email));
    };

    const navigate = useNavigate();

    if (team) navigate('/');

    if (!show)
        return (
            <div>Вы в команде, информация о команде находится в профиле</div>
        );

    if (stage === STAGES.ZERO || stage === STAGES.ONE)
        return (
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <div className={styles.taskTitle}>Ещё рано</div>
                    </div>
                </div>
                <div className={styles.content}></div>
            </div>
        );

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.taskTitle}>Объединиться в комманду</div>
                </div>
                <div className={styles.border}></div>
                <div className={styles.content}>

                    <div className={styles.cuntFull}>
                        <div className={styles.subheader}>
                            <div className={styles.huetavsubheadere}>Пригласить участника</div>
                        </div>
                        <div className={styles.cunt}>
                            <input
                                className={styles.email}
                                placeholder="email участника"
                                value={email}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setEmail(e.target.value)
                                }></input>
                            <button
                                className={styles.send}
                                type="submit"
                                onClick={handleSubmit}>
                                пригласить в команду
                            </button>
                        </div>

                        <div className={styles.subheader}>
                            <div className={styles.huetavsubheadere}>Приглашения</div>
                        </div>

                        <div className={styles.milfs}>
                            <div className={styles.main}>
                                {invitations.invitationsToMe.length ? (
                                    invitations.invitationsToMe.map(invite => {
                                        return (
                                            <PotentialTeammate
                                                id={invite.id}
                                                status={invite.status}
                                                userFrom={invite.userFrom}
                                                userTo={invite.userTo}
                                            />
                                        );
                                    })
                                ) : (
                                    <div
                                        style={{
                                            textAlign: 'center',
                                            fontSize: 32,
                                            marginTop: 20,
                                        }}>
                                        Приглашений нет
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
