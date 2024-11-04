import styles from './TasksPage.module.scss';
import {FC, useEffect, useState} from 'react';
import {StageCounter} from 'src/widgets/stageCounter/ui/StageCounter.jsx';
import {useAppDispatch, useAppSelector} from 'src/shared/utils/hooks/redux.ts';
import {
    getStageInfoThunk,
    getTasksThunk,
} from 'src/entities/Task/taskThunks.ts';
import {Task as TaskComponent} from 'src/widgets/task';
import {CLIENT_STAGES, STAGES, Task} from 'src/entities/Task/taskModel.ts';
import {Loader} from 'src/shared/ui/Loader';
import {useNavigate} from 'react-router-dom';
import {User} from 'src/entities/User/userModel.ts';
import { getUserInfoThunk } from 'src/entities/User/userThunks';
import { getTeamsRatingThunks, getUsersRatingThunks } from 'src/entities/Rating/ratingThunks';
import { getNewsThunk } from 'src/entities/News/newsThunks';
import { getTeamInfoThunk } from 'src/entities/Team/teamThunks';

interface TasksPageProps {
    className?: string;
}

export const TasksPage: FC<TasksPageProps> = () => {
    const tasks = useAppSelector(state => state.tasks.tasksMaps);
    const clientStage = useAppSelector(state => state.tasks.menuCurrentStage);
    const stage = useAppSelector(state => state.tasks.currentStage);
    const status = useAppSelector(state => state.tasks.status);
    const user = useAppSelector(state => state.user.user) as User;
    const targetDate = useAppSelector(state => state.tasks.stageEndDate);
    const rating = useAppSelector(state => state.rating.rating);
    const news = useAppSelector(state => state.news.news);
    const team = useAppSelector(state => state.team.teamInfo);
    console.log(rating)

    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTasksThunk());
        dispatch(getTeamsRatingThunks())
        dispatch(getStageInfoThunk());
        dispatch(getNewsThunk());
        dispatch(getTeamInfoThunk());
        
        const intervalId = setInterval(() => {
          const now = new Date();
          const target = new Date(targetDate);
          const diff = target.getTime() - now.getTime(); 

          if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
            setCountdown({ days, hours, minutes, seconds });
          } else {
            clearInterval(intervalId); 
          }
        }, 1000);
    
        return () => clearInterval(intervalId);
    }, [targetDate]);

    // @ts-ignore
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.userBlock}>
                    <h2>{user.content.userName.username}</h2>
                    <div className={styles.ballyandteam}>
                        <p>Баллы: {user.content.points}</p>
                        <p>Команда: {team?.team_name}</p>
                    </div>
                </div>
                <div className={styles.containerButtons}>
                    <button onClick={()=>navigate('/news')}>новости({news.length})</button>
                    <button className={styles.ratingButton} onClick={()=>navigate('/rating')}>рейтинг</button>
                    <button style={
                        (stage == STAGES.ZERO || stage == STAGES.ONE) ?
                        {display: 'none'}:
                        {}} onClick={()=>navigate('/shop')}>магазин</button>
                    <button onClick={()=>navigate('/team')}>команда</button>
                </div>
            </div>
            <div className={styles.ratings}>
                <div className={styles.header}>
                    <p className={styles.switchText}>Рейтинг</p>
                </div>
                <div className={styles.taskBorder}></div>
                <div className={styles.scroll}>
                    {!rating.length && <Loader width={60} height={60} />}
                    {rating &&
                        rating.map((item, key) => (
                            <div className={styles.ratingItem} key={key}>
                                <h1>{item.name}</h1>
                                <h1>{item.score}</h1>
                            </div>
                            ))}
                </div>
            </div>
            <div className={styles.listOfTasks}>
                <div className={styles.header}>
                    <p className={styles.switchText}>Выбери этап</p>
                    <p className={`${styles.switchText} ${styles.countdown}`}>До конца этапа: {countdown.days} days {countdown.hours} hours {countdown.minutes} minutes {countdown.seconds} seconds</p>
                    <div className={styles.stageSwitcherOptions}>
                        <StageCounter
                            stage={CLIENT_STAGES.ZERO}
                            unlocked={
                                stage === STAGES.ZERO ||
                                stage === STAGES.ONE ||
                                stage === STAGES.TWO
                            }
                        />
                        <StageCounter
                            stage={CLIENT_STAGES.ONE}
                            unlocked={
                                stage === STAGES.ONE || stage === STAGES.TWO
                            }
                        />
                        <StageCounter
                            stage={CLIENT_STAGES.TWO}
                            unlocked={stage === STAGES.TWO}
                        />
                    </div>
                </div>
                <div className={styles.taskBorder}></div>
                <div className={styles.scroll}>
                    {status === 'loading' && <Loader width={60} height={60} />}
                    {status === 'error' && <div>Произошла ошибка :(</div>}
                    {tasks[clientStage] &&
                        tasks[clientStage]?.length &&
                        status == 'idle' &&
                        tasks[clientStage].map((task: Task) => {
                            return (
                                <TaskComponent
                                    points={task.potentialPoints}
                                    title={task.title}
                                    status={task.status}
                                    key={task.id}
                                    id={task.id}
                                />
                            );
                        })}

                    {!tasks[clientStage]?.length && (
                        <div className={styles.locked}>
                            Заданий нет, мы вам перезвоним👋
                        <br />
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.footer}>
                По вопросам: <a href="https://t.me/filimonqqq">@filimonqqq</a>
            </div>
        </div>
    );
};
