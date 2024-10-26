import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosError, AxiosResponse} from 'axios';
import {getNew, getNews} from 'src/shared/api/ApiCalls.ts';
import {BackendError} from 'src/app/types/global.ts';
import {getErrorMessage} from 'src/shared/utils/api';
import {New} from 'src/entities/News/newsModel.ts';

export const getNewsThunk = createAsyncThunk<
    New[],
    void,
    {rejectValue: string}
>('news/getNewsThunk', async (_, {rejectWithValue}) => {
    try {
        const res: AxiosResponse<{
            content: New[];
        }> = await getNews() || {data: {content: [{
            "id": 0,
            "publicationTime": "string",
            "shortText": "string",
            "title": "string"
          }]}};

        return res.data.content;
    } catch (e: unknown | AxiosError<BackendError>) {
        return rejectWithValue(getErrorMessage(e));
    }
});

export const getNewByIdThunk = createAsyncThunk<
    {
        details: New;
        text: string;
    },
    number,
    {rejectValue: string}
>('news/getNewByIdThunk', async (id, {rejectWithValue}) => {
    try {
        const res: AxiosResponse<{
            content: {
                details: New;
                text: string;
            };
        }> = await getNew(id);
        return res.data.content;
    } catch (e: unknown | AxiosError<BackendError>) {
        return rejectWithValue(getErrorMessage(e));
    }
});
