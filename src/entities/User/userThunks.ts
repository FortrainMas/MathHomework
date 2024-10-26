import {createAsyncThunk} from '@reduxjs/toolkit';
import {
    LoginData,
    RegisterData,
    Token,
    User,
} from 'src/entities/User/userModel.ts';
import {
    confirmEmail,
    getUserInfo,
    getUserPoints,
    login,
    registerUser,
} from 'src/shared/api/ApiCalls.ts';
import {AxiosError, AxiosResponse} from 'axios';
import {BackendError} from 'src/app/types/global.ts';
import {getErrorMessage} from 'src/shared/utils/api';
import {saveToken} from 'src/shared/api/Cookie.ts';

export const registerThunk = createAsyncThunk<
    void,
    RegisterData,
    {rejectValue: string}
>('user/registerThunk', async (data, {rejectWithValue}) => {
    try {
        await registerUser(data);
    } catch (e: unknown | AxiosError<BackendError>) {
        return rejectWithValue(getErrorMessage(e));
    }
});

export const loginThunk = createAsyncThunk<
    Token,
    LoginData,
    {rejectValue: string}
>('user/loginThunk', async (data, {rejectWithValue, dispatch}) => {
    try {
        const res = await login(data);
        saveToken(res.data.token);

        await dispatch(getUserInfoThunk());

        return res.data;
    } catch (e: unknown | AxiosError<BackendError>) {
        return rejectWithValue(getErrorMessage(e));
    }
});

export const confirmEmailThunk = createAsyncThunk<
    Token,
    Token,
    {rejectValue: string}
>('user/confirmEmailThunk', async (code, {rejectWithValue, dispatch}) => {
    try {
        const res = await confirmEmail(code);
        saveToken(res.data.token);
        await dispatch(getUserInfoThunk());

        return res.data;
    } catch (e: unknown | AxiosError<BackendError>) {
        return rejectWithValue(getErrorMessage(e));
    }
});

export const getUserInfoThunk = createAsyncThunk<
    User,
    void,
    {rejectValue: string}
>('user/getUserInfoThunk', async (_, {rejectWithValue}) => {
    try {
        const res = await getUserInfo();
        const points: AxiosResponse<{points: number}> = await getUserPoints();

        return {
            content: {
                ...res.data.content,
                ...points.data,
            },
        };
    } catch (e: unknown | AxiosError<BackendError>) {
        return rejectWithValue(getErrorMessage(e));
    }
});
