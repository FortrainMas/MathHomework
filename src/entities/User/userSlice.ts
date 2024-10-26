import {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import {User} from './userModel.ts';
import {deleteToken, saveToken} from 'src/shared/api/Cookie.ts';
import {
    confirmEmailThunk,
    getUserInfoThunk,
    loginThunk,
    registerThunk,
} from './userThunks.ts';

type initialState = {
    user: User | null;
    isAuth: boolean;
    showCodeInput: boolean;
    status: string;
    isBanned: boolean;
};

const initialState: initialState = {
    user: null,
    isAuth: false,
    showCodeInput: false,
    status: 'loading user info',
    isBanned: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setShowCodeInput: (state, action: PayloadAction<boolean>) => {
            state.showCodeInput = action.payload;
        },
        setStatus: (state, action: PayloadAction<string>) => {
            state.status = action.payload;
            deleteToken();
        },
        incrementUserBalance: (state, action: PayloadAction<number>) => {
            if (state.user) state.user.content.points += action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(registerThunk.fulfilled, (state, _) => {
            state.showCodeInput = true;
            toast('На твою почту отправлен код!');
        });
        builder.addCase(registerThunk.rejected, (_, action) => {
            toast.error(action.payload);
        });
        builder.addCase(confirmEmailThunk.fulfilled, (state, action) => {
            saveToken(action.payload.token);
            state.isAuth = true;
            toast('Ты в игре!');
        });
        builder.addCase(confirmEmailThunk.rejected, (_, action) => {
            toast.error(action.payload);
        });
        builder.addCase(loginThunk.fulfilled, state => {
            toast('Ты в игре!');
            // saveToken(action.payload.token);
            state.status = 'idle';
            state.isAuth = true;
        });
        builder.addCase(loginThunk.rejected, (_, action) => {
            toast.error(action.payload);
        });
        builder.addCase(getUserInfoThunk.pending, state => {
            state.status = 'loading user info';
        });
        builder.addCase(getUserInfoThunk.fulfilled, (state, action) => {
            state.status = 'idle';
            state.user = action.payload;
            state.isAuth = true;
        });
        builder.addCase(getUserInfoThunk.rejected, (state, action) => {
            state.isAuth = false;
            state.status = 'idle';
            toast.error(action.payload);
        });
    },
});

export const {setShowCodeInput, setStatus, incrementUserBalance} =
    userSlice.actions;
export default userSlice.reducer;
