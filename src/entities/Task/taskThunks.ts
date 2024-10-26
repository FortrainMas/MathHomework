import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosError, AxiosResponse} from 'axios';
import {
    getStageInfo,
    getTask,
    getTasks,
    sendAnswer,
    sendAnswerFile,
} from 'src/shared/api/ApiCalls.ts';
import {BackendError} from 'src/app/types/global.ts';
import {getErrorMessage} from 'src/shared/utils/api';
import {FullTask, STAGES, TasksStages} from 'src/entities/Task/taskModel.ts';
import {incrementUserBalance} from 'src/entities/User/userSlice.ts';
import {incrementTeamBalance} from 'src/entities/Team/teamSlice.ts';


export const getTasksThunk = createAsyncThunk<
    TasksStages,
    void,
    {rejectValue: string}
>('tasks/getTasksThunk', async (_, {rejectWithValue}) => {
    try {
        const res: AxiosResponse<{
            tasksMaps: TasksStages;
        }> = await getTasks();

        return res.data.tasksMaps;
    } catch (e: unknown | AxiosError<BackendError>) {
        return rejectWithValue(getErrorMessage(e));
    }
});

export const getStageInfoThunk = createAsyncThunk<
    {
        endDate: string;
        stage: STAGES;
    },
    void,
    {rejectValue: string}
>('tasks/getStageInfoThunk', async (_, {rejectWithValue}) => {
    try {
        const res: AxiosResponse<{
            currentStage: {
                endDate: string;
                stage: STAGES;
            };
        }> = await getStageInfo();

        return res.data.currentStage;
    } catch (e: unknown | AxiosError<BackendError>) {
        return rejectWithValue(getErrorMessage(e));
    }
});

export const getTaskByIdThunk = createAsyncThunk<
    FullTask,
    number,
    {rejectValue: string}
>('tasks/getTaskByIdThunk', async (id, {rejectWithValue}) => {
    try {
        const res: AxiosResponse<FullTask> = await getTask(id);
        console.log(res.data);
        return res.data;
    } catch (e: unknown | AxiosError<BackendError>) {
        console.log("BLYAD")
        return rejectWithValue(getErrorMessage(e));
    }
});

export const sendAnswerFileThunk = createAsyncThunk<
    any,
    FormData,
    {rejectValue: string}
>(
    'tasks/sendAnswerFileThunk',
    async (data: FormData, {rejectWithValue, dispatch}) => {
        try {
            const res = await sendAnswerFile(data);

            if (res.data.message === 'Задание выполнено.') {
                dispatch(incrementUserBalance(res.data.points));
            }

            return res.data;
        } catch (e: unknown | AxiosError<BackendError>) {
            return rejectWithValue(getErrorMessage(e));
        }
    }
);

export const sendAnswerThunk = createAsyncThunk<
    any,
    {answer: string; id: number},
    {rejectValue: string}
>('tasks/sendAnswerFile', async ({answer, id}, {rejectWithValue, dispatch}) => {
    try {
        const res = await sendAnswer({answer, taskId: id});

        if (res.data.message === 'Задание выполнено.') {
            dispatch(incrementTeamBalance(res.data.points));
        }

        return res.data;
    } catch (e: unknown | AxiosError<BackendError>) {
        return rejectWithValue(getErrorMessage(e));
    }
});
