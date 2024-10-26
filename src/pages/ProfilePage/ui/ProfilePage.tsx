import styles from './ProfilePage.module.scss';
import {FC, useEffect} from 'react';
import {Achievement} from 'src/widgets/achivment/ui/Achievement.tsx';
import {Team} from 'src/widgets/team/ui/Team.tsx';
import {useAppDispatch, useAppSelector} from 'src/shared/utils/hooks/redux.ts';
import {getUsersRatingThunks} from 'src/entities/Rating/ratingThunks.ts';
import {Loader} from 'src/shared/ui/Loader';
import {getStageInfoThunk1} from 'src/entities/Stage/stageThunks.ts';
import {CurrentTeam} from 'src/widgets/currentTeam/ui/currentTeam.tsx';

interface ProfilePageProps {
    className?: string;
}

export const ProfilePage: FC<ProfilePageProps> = () => {
    const rating = useAppSelector(state => state.rating.rating);

    const achievements = useAppSelector(
        state => state?.user?.user?.content.achievements
    );

    const team = useAppSelector(state => state.team.teamInfo);

    const email = useAppSelector(
        state => state?.user?.user?.content.userName.email
    );

    const status = useAppSelector(state => state.rating.status);
    const userStatus = useAppSelector(state => state.user.status);
    const poinsts = useAppSelector(state => state.team.points);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUsersRatingThunks());
        dispatch(getStageInfoThunk1());
        // dispatch(getTeamInfoThunk());
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.profileSquares}>
                <div className={styles.leftColumn}>
                    <div className={styles.teamHolder}>
                        {team?.team_name ? (
                            <CurrentTeam
                                name={team.team_name}
                                balance={poinsts}
                                copilot={
                                    team.members.filter(
                                        item => item.email !== email
                                    )[0].username
                                }
                            />
                        ) : (
                            <div className={styles.enough}>
                                Ты не в команде, создай (пригласи сам) или жди
                                приглашения! Твои приглашения ниже
                            </div>
                        )}
                    </div>
                    <div className={styles.header1}>
                        <p className={styles.text}>Achievements</p>
                    </div>
                    <div className={styles.achivmentHolder}>
                        <div className={styles.achScroll}>
                            {userStatus === 'idle' && achievements?.length ? (
                                achievements.map(item => {
                                    return (
                                        <Achievement
                                            key={item.title}
                                            description={item.description}
                                            image={item.image}
                                            title={item.title}
                                        />
                                    );
                                })
                            ) : (
                                <div className={styles.notAch}>
                                    Нет достижений
                                </div>
                            )}
                            {status === 'loading user info' && (
                                <Loader width={50} height={50} />
                            )}
                        </div>
                    </div>
                </div>
                <div className={styles.rightColumn}>
                    <div className={styles.header1}>
                        <p className={styles.text}>
                            Rating. У факультетов разные задания и баллы.{' '}
                        </p>
                    </div>
                    <div className={styles.rateHolder}>
                        <div className={styles.rateScroll}>
                            {status === 'idle' &&
                                rating.map((user, index) => {
                                    return (
                                        <Team
                                            key={index}
                                            position={index + 1}
                                            name={user.name}
                                            score={user.score}
                                        />
                                    );
                                })}
                            {status === 'loading rating' && (
                                <Loader width={50} height={50} />
                            )}
                        </div>
                    </div>
                    <div className={styles.memeHolder}>
                        <div className={styles.header1}>
                            <p className={styles.text}>
                                Поругать или похвалить разрабов
                            </p>
                        </div>
                        <div className={styles.border}></div>
                        <p className={styles.contacts}>
                            <div>
                                <div className={styles.contact}>
                                    Backend:{' '}
                                    <a
                                        href="https://t.me/a_a_surkova"
                                        target="_blank">
                                        Anastasya Surkova
                                    </a>
                                </div>
                                <div className={styles.contact}>
                                    Design and HTML & CSS:{' '}
                                    <a
                                        href="https://t.me/aloha_kuino"
                                        target="_blank">
                                        Alexandr Shushakov
                                    </a>
                                </div>
                            </div>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
