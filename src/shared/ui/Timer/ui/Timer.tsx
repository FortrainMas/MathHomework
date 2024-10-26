import styles from './Timer.module.scss';
import {createTimeModel, useTimeModel} from 'react-compound-timer';

interface TimerProps {
    className?: string;
    date: string;
}

const timer = createTimeModel({
    initialTime: Date.parse('01 Dec 2023 01:00:00 GMT+7') - Date.now(),
    direction: 'backward',
});

export const Timer = ({}: TimerProps) => {
    const {value} = useTimeModel(timer);

    // const endDate = useAppSelector(state => state.stage.currentStage?.endDate);

    const days = value.d ? `${value.d}-` : '';

    return (
        <div className={styles.wrapper}>
            <div
                className={
                    styles.numbers
                }>{`${days}${value.h}-${value.m}-${value.s}`}</div>
            <div className={styles.text}>до конца этапа</div>
        </div>
    );
};
