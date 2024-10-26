import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosError, AxiosResponse} from 'axios';
import {getStageInfo} from 'src/shared/api/ApiCalls.ts';
import {BackendError} from 'src/app/types/global.ts';
import {getErrorMessage} from 'src/shared/utils/api';
import {Stage} from 'src/entities/Stage/stageModel.ts';

export const getStageInfoThunk1 = createAsyncThunk<
    Stage,
    void,
    {rejectValue: string}
>('stage/getStageInfoThunk', async (_, {rejectWithValue}) => {
    try {
        const res: AxiosResponse<{currentStage: Stage}> = await getStageInfo();

        return res.data.currentStage;
    } catch (e: unknown | AxiosError<BackendError>) {
        return rejectWithValue(getErrorMessage(e));
    }
});
