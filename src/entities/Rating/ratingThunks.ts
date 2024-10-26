import {createAsyncThunk} from '@reduxjs/toolkit';
import {getUsersRating} from 'src/shared/api/ApiCalls.ts';
import {BackendError} from 'src/app/types/global.ts';
import {getErrorMessage} from 'src/shared/utils/api';
import {AxiosError, AxiosResponse} from 'axios';
import {Rating} from 'src/entities/Rating/ratingModel.ts';

export const getUsersRatingThunks = createAsyncThunk<
    Rating[],
    void,
    {rejectValue: string}
>('rating/getUsersRatingThunks', async (_, {rejectWithValue}) => {
    try {
        const res: AxiosResponse<{rating: Rating[]}> =
            await getUsersRating('DESC');

        return res.data.rating;
    } catch (e: unknown | AxiosError<BackendError>) {
        return rejectWithValue(getErrorMessage(e));
    }
});
