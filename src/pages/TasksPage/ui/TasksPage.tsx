import styles from './TasksPage.module.scss';
import {FC, useEffect} from 'react';
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

interface TasksPageProps {
    className?: string;
}

export const TasksPage: FC<TasksPageProps> = () => {
    const tasks = useAppSelector(state => state.tasks.tasksMaps);
    const clientStage = useAppSelector(state => state.tasks.menuCurrentStage);
    const stage = useAppSelector(state => state.tasks.currentStage);
    const status = useAppSelector(state => state.tasks.status);
    //const user = useAppSelector(state => state.user.user) as User;

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTasksThunk());
        dispatch(getStageInfoThunk());
        //dispatch(getUserInfoThunk());
    }, []);

    // @ts-ignore
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                {/* <p style={{fontSize: '50px'}}>
                    Твои баллы: {user.content.points}
                </p> */}
                <button style={{fontSize: '50px'}} onClick={()=>navigate('/news')}>новости</button>
                {/* <button style={
                    (stage == STAGES.ZERO || stage == STAGES.ONE) ?
                    {fontSize: '50px', display: 'none'}:
                    {fontSize: '50px'}} onClick={()=>navigate('/shop')}>магазин</button> */}
                <button style={{fontSize: '50px'}} onClick={()=>navigate('/team')}>комманда</button>
            </div>
            <div className={styles.listOfTasks}>
                <div className={styles.header}>
                    <p className={styles.switchText}>Выбери этап</p>
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
        </div>
    );
};
