import styles from './Profile.module.scss';
import {useAppDispatch, useAppSelector} from 'src/shared/utils/hooks/redux.ts';
import {User} from 'src/entities/User/userModel.ts';
import avatar from 'src/shared/assets/images/ava.jpeg';
import {EditOutlined} from '@ant-design/icons';
import {Popover} from 'antd';
import {Link} from 'react-router-dom';
import {useEffect} from 'react';
import {getTeamPointsThunk} from 'src/entities/Team/teamThunks.ts';

interface ProfileProps {
    className?: string;
}

const content = (
    <div className={styles.popover}>
        Ты правда думал, что просто так поменяешь себе имя? Плати шейкели и тебе
        поменяют, так что беги писать админу))
    </div>
);

export const Profile = ({}: ProfileProps) => {
    const user = useAppSelector(state => state.user.user) as User;
    const team = useAppSelector(state => state.team?.teamInfo);
    const dispatch = useAppDispatch();

    const points = useAppSelector(state => state.team.points);

    useEffect(() => {
        dispatch(getTeamPointsThunk());
    }, []);

    return (
        <div className={styles.profileInfo}>
            <div className={styles.fullProfile}>
                <div className={styles.ava}>
                    <img src={avatar} height={141} width={141} />
                </div>
                <div className={styles.withoutDickPick}>
                    <div
                        className={`${styles.nicknameAndLevel} ${styles.profileItem}`}>
                        <div className={styles.nick}>
                            <div>{user.content.userName.username}</div>{' '}
                            <Popover
                                content={content}
                                trigger="click"
                                placement="bottom"
                                className={styles.popover}
                                color="#040D12"
                                style={{
                                    color: '#fff',
                                    fontFamily: 'tickingBomb',
                                }}
                                overlayInnerStyle={{
                                    color: '#fff',
                                    fontSize: 18,
                                    fontFamily: 'PT Mono',
                                    width: 250,
                                }}>
                                <EditOutlined
                                    className={styles.editIcon}
                                    height={40}
                                    width={40}
                                />
                            </Popover>
                        </div>
                        <div className={`${styles.level} ${styles.regText}`}>
                            your iq: {Math.ceil(Math.random() * 40)}
                        </div>
                    </div>
                    <div className={styles.line}></div>
                    <div
                        className={`${styles.fullBalance} ${styles.profileItem}`}>
                        <div className={styles.balance}>BALANCE</div>
                        <div
                            className={`${styles.currentBalance} ${styles.regText}`}>
                            {points}
                        </div>
                    </div>
                    <div className={styles.line}></div>
                    <div className={`${styles.fullTeam} ${styles.profileItem}`}>
                        <div className={styles.team}>TEAM</div>
                        <div
                            className={`${styles.currentTeam} ${styles.regText}`}>
                            {team?.team_name ? (
                                <div className={styles.teamName}>
                                    {team.team_name}
                                </div>
                            ) : (
                                <Link
                                    to="/create-team"
                                    className={`${styles.currentTeam} ${styles.regText}`}>
                                    Create team
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
