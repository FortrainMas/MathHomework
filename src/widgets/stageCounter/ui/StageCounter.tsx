import styles from './StageCounter.module.scss';
import {FC} from 'react';
import {setCurrentMenuStage} from 'src/entities/Task/taskSLice.ts';
import {useAppDispatch, useAppSelector} from 'src/shared/utils/hooks/redux.ts';
import {CLIENT_STAGES} from 'src/entities/Task/taskModel.ts';
import lock from 'src/shared/assets/icons/lock.png';

interface StageCounterProps {
    stage: CLIENT_STAGES;
    unlocked: boolean;
}

export const StageCounter: FC<StageCounterProps> = ({stage, unlocked}) => {
    const dispatch = useAppDispatch();
    const currentStage = useAppSelector(state => state.tasks.menuCurrentStage);

    const handleCLick = () => {
        if (unlocked) dispatch(setCurrentMenuStage(stage));
    };

    return (
        <div
            className={`${styles.stageSquare} ${
                currentStage === stage && styles.active
            } ${!unlocked && styles.locked}`}
            onClick={handleCLick}>
            {unlocked ? (
                <div className={styles.stageText}>{
                    stage === CLIENT_STAGES.ZERO ? 'Нулевой' : 
                    stage === CLIENT_STAGES.ONE ? 'Первый' : 'Второй'}</div>
            ) : (
                <img src={lock} alt="Х" width={30} height={30} />
            )}
        </div>
    );
};
