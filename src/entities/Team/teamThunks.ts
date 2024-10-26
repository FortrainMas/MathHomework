import {createAsyncThunk} from '@reduxjs/toolkit';
import {Team, TeamInfo} from 'src/entities/Team/teamModel.ts';
import {AxiosError, AxiosResponse} from 'axios';
import {BackendError} from 'src/app/types/global.ts';
import {
    editTeamInfo,
    getTeamInfo,
    getTeamInvitations,
    getTeamPoints,
    inviteUserToTeam,
    respondUserInvitation,
} from 'src/shared/api/ApiCalls.ts';
import {getErrorMessage} from 'src/shared/utils/api';

export const getTeamInfoThunk = createAsyncThunk<
    TeamInfo,
    void,
    {rejectValue: string}
>('team/getTeamInfoThunk', async (_, {rejectWithValue}) => {
    try {
        const res: AxiosResponse<{teamInfo: TeamInfo}> = await getTeamInfo();

        return res.data.teamInfo;
    } catch (e: unknown | AxiosError<BackendError>) {
        return rejectWithValue(getErrorMessage(e));
    }
});

export const editTeamThunk = createAsyncThunk<
    Team,
    string,
    {rejectValue: string}
>('team/editTeamThunk', async (name, {rejectWithValue}) => {
    try {
        const res: AxiosResponse<{teamInfo: Team}> = await editTeamInfo(name);

        return res.data.teamInfo;
    } catch (e: unknown | AxiosError<BackendError>) {
        return rejectWithValue(getErrorMessage(e));
    }
});

export const getInvitationsThunk = createAsyncThunk<
    {
        invitationsToMe: [];
        myCurrentInvitation: null;
    },
    void,
    {rejectValue: string}
>('team/getInvitationsThunk', async (_, {rejectWithValue}) => {
    try {
        const res: AxiosResponse<{
            content: {
                invitationsToMe: [];
                myCurrentInvitation: null;
            };
        }> = await getTeamInvitations();

        return res.data.content;
    } catch (e: unknown | AxiosError<BackendError>) {
        return rejectWithValue(getErrorMessage(e));
    }
});

export const inviteUserThunk = createAsyncThunk<
    void,
    string,
    {rejectValue: string}
>('team/inviteUserThunk', async (email, {rejectWithValue}) => {
    try {
        const res = await inviteUserToTeam(email);

        return res.data;
    } catch (e: unknown | AxiosError<BackendError>) {
        return rejectWithValue(getErrorMessage(e));
    }
});

export const acceptInviteThunk = createAsyncThunk<
    void,
    {id: number; action: string},
    {rejectValue: string}
>(
    'team/acceptInviteThunk',
    async ({id, action}, {rejectWithValue, dispatch}) => {
        try {
            const res = await respondUserInvitation(id, action);
            await dispatch(getTeamInfoThunk());

            return res.data;
        } catch (e: unknown | AxiosError<BackendError>) {
            return rejectWithValue(getErrorMessage(e));
        }
    }
);

export const getTeamPointsThunk = createAsyncThunk<
    number,
    void,
    {rejectValue: string}
>('team/getTeamPointsThunk', async (_, {rejectWithValue}) => {
    try {
        const res: AxiosResponse<{points: number}> = await getTeamPoints();

        return res.data.points;
    } catch (e: unknown | AxiosError<BackendError>) {
        return rejectWithValue(getErrorMessage(e));
    }
});
