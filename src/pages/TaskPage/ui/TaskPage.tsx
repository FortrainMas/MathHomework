import styles from './TaskPage.module.scss';
import {ChangeEvent, FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from 'src/shared/utils/hooks/redux.ts';
import {
    getTaskByIdThunk,
    sendAnswerFileThunk,
    sendAnswerThunk,
} from 'src/entities/Task/taskThunks.ts';
import {Loader} from 'src/shared/ui/Loader';
import {toast} from 'react-toastify';
import {
    ANSWER_STATUSES,
    ANSWER_TYPES,
    TASK_STATUSES,
} from 'src/entities/Task/taskModel.ts';
import {useNavigate} from 'react-router-dom';
import FormattedMessage from 'src/shared/ui/formatted-message/FormattedMessage.tsx';
import {AnimatePresence, motion} from 'framer-motion';
import {resetCurrentTask} from 'src/entities/Task/taskSLice.ts';

interface TaskPageProps {
    className?: string;
}

export const TaskPage: FC<TaskPageProps> = ({}: TaskPageProps) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const id = +window.location.pathname.replace('/task/', '');
        dispatch(getTaskByIdThunk(id));

        return () => {
            dispatch(resetCurrentTask());
        };
    }, []);

    const task = useAppSelector(state => state.tasks.fullTask);
    const status = useAppSelector(state => state.tasks.status);

    const [selectedFile, setSelectedFile] = useState<File>();
    const navigate = useNavigate();
    const media = useAppSelector(state => state.tasks.media);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const [answer, setAnswer] = useState('');
    const [timer, setTimer] = useState(false);
    const [showed, setShowed] = useState(false);

    const handleSubmit = () => {
        if (!timer) {
            setTimer(true);
            setTimeout(() => {
                setTimer(false);
            }, 5000);

            if (task?.answerType === ANSWER_TYPES.FILE) {
                if (selectedFile && task.taskInfo.id) {
                    const data = new FormData();

                    try {
                        data.append('file', selectedFile);
                        data.append('taskId', task.taskInfo.id.toString());
                        dispatch(sendAnswerFileThunk(data));
                    } catch (e) {
                        toast.error('Ошибка при загрузке файла');
                        return;
                    }
                } else {
                    toast.error('Загрузи файл');
                }
            } else {
                if (answer.length && task)
                    dispatch(
                        sendAnswerThunk({answer, id: task.taskInfo.id})
                    ).then(() => {
                        if (!showed) {
                            toast.info(
                                'Дабы избежать подбора ответов, форма будет блокироваться на 5 сек после отправки. Удачного брутфорса)'
                            );
                            setShowed(true);
                        }
                    });

                setAnswer('');
            }
        }
    };

    if (status === 'error with full tasks') {
        navigate('/');
    }

    // @ts-ignore
    return (
        <div className={styles.curTaskFull}>
            <div className={styles.header}>
                <div className={styles.taskTitle}>
                    {/*@ts-ignore*/}
                    <FormattedMessage>{task?.taskInfo.title}</FormattedMessage>
                </div>
            </div>
            <div className={styles.border}></div>
            {status === 'loading full task' && !task && (
                <div style={{height: 200}}>
                    <Loader height={50} width={50} />
                </div>
            )}
            <form
                action=""
                //@ts-ignore
                onSubmit={(e: SubmitEvent) => {
                    e.preventDefault();
                }}
                className={styles.form}>
                {status !== 'loading full task' && task && (
                    <div className={styles.container}>
                        <div className={styles.description}>
                            {' '}
                            <FormattedMessage>{task?.content}</FormattedMessage>
                        </div>
                        <div style={{display: 'flex', marginTop: 20}}>
                            {media.map((media, index) => {
                                return (
                                    <div className={styles.mediaItem}>
                                        <a href={media.link} target="_blank">
                                            Медиа {index + 1}
                                        </a>
                                    </div>
                                );
                            })}
                        </div>
                        <hr />
                        {task?.answerStatus ===
                        ANSWER_STATUSES.SENT_TO_CHECK ? (
                            <div className={styles.done}>
                                Задание отправлено на проверку!
                            </div>
                        ) : (
                            <div>
                                {task.taskInfo.status !==
                                    TASK_STATUSES.COMPLETED && (
                                    <div className={styles.price}>
                                        Награда за выполнение:{' '}
                                        <span className={styles.priceValue}>
                                            {task?.taskInfo.potentialPoints}
                                        </span>
                                    </div>
                                )}
                                <AnimatePresence>
                                    {task.taskInfo.status ===
                                        TASK_STATUSES.COMPLETED && (
                                        <motion.div
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1}}
                                            exit={{opacity: 0}}
                                            transition={{
                                                duration: 0.4,
                                                delay: 0.2,
                                            }}
                                            className={styles.done}>
                                            Задание выполнено ✅
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {task.taskInfo.status ===
                                    TASK_STATUSES.AVAILABLE && (
                                    <div className={styles.cunt}>
                                        <div className={styles.answTxt}>
                                            Ответ:
                                        </div>

                                        {task.answerType ===
                                        ANSWER_TYPES.FILE ? (
                                            <>
                                                <label
                                                    className={
                                                        styles.uploadFile
                                                    }>
                                                    <input
                                                        type="file"
                                                        multiple={false}
                                                        onChange={handleChange}
                                                    />
                                                    Загрузить файл
                                                </label>
                                                <div
                                                    className={
                                                        styles.uploadedFile
                                                    }>
                                                    {selectedFile
                                                        ? selectedFile.name
                                                        : 'Грузи, не очкуй!'}
                                                </div>
                                            </>
                                        ) : (
                                            <input
                                                className={styles.answer}
                                                disabled={timer}
                                                onChange={(
                                                    e: ChangeEvent<HTMLInputElement>
                                                ) => setAnswer(e.target.value)}
                                                value={answer}
                                            />
                                        )}
                                        <AnimatePresence>
                                            {(selectedFile || answer) && (
                                                <motion.button
                                                    type="submit"
                                                    className={
                                                        styles.answerButt
                                                    }
                                                    onClick={handleSubmit}
                                                    initial={{
                                                        opacity: 0,
                                                        y: 10,
                                                    }}
                                                    animate={{opacity: 1, y: 0}}
                                                    exit={{opacity: 0, y: 10}}
                                                    transition={{
                                                        duration: 0.3,
                                                    }}>
                                                    Отправить
                                                </motion.button>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </form>
        </div>
    );
};
