import {createSlice} from '@reduxjs/toolkit';
import {Stage} from 'src/entities/Stage/stageModel.ts';
import {getStageInfoThunk1} from 'src/entities/Stage/stageThunks.ts';

type initialState = {
    currentStage: Stage | null;
    status: string;
};

const initialState: initialState = {
    currentStage: null,
    status: 'idle',
};

const stageSlice = createSlice({
    name: 'stage',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getStageInfoThunk1.fulfilled, (state, action) => {
            state.status = 'idle';
            state.currentStage = action.payload;
        });
        builder.addCase(getStageInfoThunk1.pending, state => {
            state.status = 'loading stage';
        });
        builder.addCase(getStageInfoThunk1.rejected, state => {
            state.status = 'idle';
        });
    },
});

export default stageSlice.reducer;
