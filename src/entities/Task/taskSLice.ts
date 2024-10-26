import {
    CLIENT_STAGES,
    FullTask,
    STAGES,
    TASK_STATUSES,
    TasksStages,
} from 'src/entities/Task/taskModel.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
    getStageInfoThunk,
    getTaskByIdThunk,
    getTasksThunk,
    sendAnswerFileThunk,
    sendAnswerThunk,
} from 'src/entities/Task/taskThunks.ts';
import {toast} from 'react-toastify';

type initialState = {
    tasksMaps: TasksStages;
    currentStage: STAGES;
    menuCurrentStage: CLIENT_STAGES;
    status: string;
    stageEndDate: string;
    fullTask: FullTask | null;
    hideTask: boolean;
    media: {link: string}[];
};

const initialState: initialState = {
    tasksMaps: {
        [STAGES.ZERO]: [],
        [STAGES.ONE]: [],
        [STAGES.TWO]: [],
    },
    currentStage: STAGES.ZERO,
    menuCurrentStage: CLIENT_STAGES.ZERO,
    status: 'loading',
    stageEndDate: '',
    fullTask: null,
    hideTask: false,
    media: [],
};

const tasksSlice = createSlice({
    name: 'tasksSlice',
    initialState,
    reducers: {
        setCurrentMenuStage: (state, action: PayloadAction<CLIENT_STAGES>) => {
            state.menuCurrentStage = action.payload;
        },
        resetCurrentTask: state => {
            state.fullTask = null;
        },
        addMedia: (state, action: PayloadAction<{link: string}>) => {
            state.media.push(action.payload);
        },
        clearMedia: state => {
            state.media = [];
        },
    },
    extraReducers: builder => {
        builder.addCase(getTasksThunk.fulfilled, (state, action) => {
            state.tasksMaps = action.payload;
            state.status = 'idle';
        });
        builder.addCase(getTasksThunk.pending, state => {
            state.status = 'loading';
        });
        builder.addCase(getTasksThunk.rejected, (state, action) => {
            toast.error(action.payload);
            state.status = 'error with all tasks';
        });
        builder.addCase(getStageInfoThunk.fulfilled, (state, action) => {
            state.currentStage = action.payload.stage;
            state.stageEndDate = action.payload.endDate;
        });
        builder.addCase(getStageInfoThunk.rejected, (state, action) => {
            toast.error(action.payload);
            state.status = 'error with all tasks';
        });
        builder.addCase(getTaskByIdThunk.pending, state => {
            state.status = 'loading full task';
        });
        builder.addCase(getTaskByIdThunk.fulfilled, (state, action) => {
            state.status = 'idle';
            state.fullTask = action.payload;
        });
        builder.addCase(getTaskByIdThunk.rejected, (state, action) => {
            if (action.payload === 'Неверный id задачи.')
                toast.error('Самый умный?');
            else toast.error(action.payload);

            state.status = 'error with full tasks';
        });
        builder.addCase(sendAnswerThunk.fulfilled, (state, action) => {
            state.status = 'idle';
            if (action.payload.message === 'Задание выполнено.') {
                toast.success(action.payload.message);
                if (state.fullTask) {
                    state.fullTask.taskInfo.status = TASK_STATUSES.COMPLETED;
                    state.hideTask = true;
                }
            } else {
                toast.error(action.payload.message);
            }
        });
        builder.addCase(sendAnswerThunk.pending, state => {
            state.status = 'sending answer';
        });
        builder.addCase(sendAnswerThunk.rejected, (state, action) => {
            state.status = 'idle';
            toast.error(action.payload);
        });
        builder.addCase(sendAnswerFileThunk.fulfilled, (state, action) => {
            state.status = 'idle';
            if (action.payload.message === 'Отправлено на проверку.') {
                if (state.fullTask)
                    state.fullTask.taskInfo.status =
                        TASK_STATUSES.SENT_TO_CHECK;
            }
            if (action.payload.message === 'Задание выполнено.') {
                toast.success(action.payload.message);
                if (state.fullTask) {
                    state.fullTask.taskInfo.status = TASK_STATUSES.COMPLETED;
                    state.hideTask = true;
                }
            } else {
                toast.error(action.payload.message);
            }
        });
        builder.addCase(sendAnswerFileThunk.pending, state => {
            state.status = 'sending answer';
        });
        builder.addCase(sendAnswerFileThunk.rejected, (state, action) => {
            state.status = 'idle';
            toast.error(action.payload);
        });
    },
});

export const {setCurrentMenuStage, resetCurrentTask, addMedia, clearMedia} =
    tasksSlice.actions;
export default tasksSlice.reducer;
