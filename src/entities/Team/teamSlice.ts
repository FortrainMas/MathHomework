import {Invite, Team} from 'src/entities/Team/teamModel.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
    acceptInviteThunk,
    editTeamThunk,
    getInvitationsThunk,
    getTeamInfoThunk,
    getTeamPointsThunk,
    inviteUserThunk,
} from 'src/entities/Team/teamThunks.ts';
import {toast} from 'react-toastify';

type initialState = {
    teamInfo: Team | null;
    invitations: {
        invitationsToMe: Invite[];
        myCurrentInvitation: Invite | null;
    };
    show: boolean;
    points: number;
};

const initialState: initialState = {
    teamInfo: null,
    invitations: {
        invitationsToMe: [],
        myCurrentInvitation: null,
    },
    show: true,
    points: 0,
};

const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        incrementTeamBalance: (state, action: PayloadAction<number>) => {
            state.points += action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(getTeamInfoThunk.fulfilled, (state, action) => {
            //@ts-ignore
            state.teamInfo = action.payload;
        });
        builder.addCase(getTeamInfoThunk.rejected, (_, action) => {
            toast.error(action.payload);
        });
        builder.addCase(editTeamThunk.fulfilled, (state, action) => {
            state.teamInfo = action.payload;
        });
        builder.addCase(editTeamThunk.rejected, (_, action) => {
            toast.error(action.payload);
        });
        builder.addCase(getInvitationsThunk.fulfilled, (state, action) => {
            state.invitations = action.payload;
        });
        builder.addCase(getInvitationsThunk.rejected, (_, action) => {
            toast.error(action.payload);
        });
        builder.addCase(inviteUserThunk.fulfilled, () => {
            toast('Приглашение отправлено');
        });
        builder.addCase(inviteUserThunk.rejected, (_, action) => {
            toast.error(action.payload);
        });
        builder.addCase(acceptInviteThunk.fulfilled, state => {
            toast('Приглашение принято! Вы в команде!');
            state.show = false;
        });
        builder.addCase(acceptInviteThunk.rejected, (_, action) => {
            toast.error(action.payload);
        });
        builder.addCase(getTeamPointsThunk.fulfilled, (state, action) => {
            state.points = action.payload;
        });
    },
});

export const {incrementTeamBalance} = teamSlice.actions;

export default teamSlice.reducer;
