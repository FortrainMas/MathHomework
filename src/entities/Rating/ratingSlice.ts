import {Rating} from 'src/entities/Rating/ratingModel.ts';
import {createSlice} from '@reduxjs/toolkit';
import {getUsersRatingThunks} from 'src/entities/Rating/ratingThunks.ts';
import {getTasksThunk} from 'src/entities/Task/taskThunks.ts';
import {toast} from 'react-toastify';

type initialState = {
    rating: Rating[];
    status: string;
};

const initialState: initialState = {
    rating: [],
    status: 'idle',
};

const ratingSlice = createSlice({
    name: 'rating',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getUsersRatingThunks.fulfilled, (state, action) => {
            state.rating = action.payload;
            state.status = 'idle';
        });
        builder.addCase(getTasksThunk.rejected, (state, action) => {
            toast.error(action.payload);
            state.status = 'idle';
        });
        builder.addCase(getTasksThunk.pending, state => {
            state.status = 'loading rating';
        });
    },
});

export default ratingSlice.reducer;
