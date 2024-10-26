import axios from 'axios';

import {getToken} from './Cookie';
import {LoginData, RegisterData, Token} from 'src/entities/User/userModel.ts';

const createApiCall: (restPath: string) => string = (restPath: string) => {
    //return `http://localhost:3000${restPath}`;   
    return `http://83.166.235.246:8080/api/v1/${restPath}`;

    //return `http://158.160.121.153:8080/api/v1${restPath}`;
};

const getUserTokenHeader = () => {
    const token = getToken();

    return {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
};

const getJSONHeader = () => {
    return {
        headers: {
            'Content-Type': 'application/json',
        },
    };
};

export const getNews = () => axios.get(createApiCall('/news/list'));

export const getNew = (id: number) =>
    axios.get(createApiCall(`/news/article?id=${id}`));

export const getNewsEvent = (id: number) =>
    axios.get(createApiCall(`/news/article?id=${id}`));

export const getTaskEvent = (id: number) => {
    axios.get(createApiCall(`/tasks/get/${id}`), getUserTokenHeader());
};

export const getUserInfo = () =>
    axios.get(createApiCall('/user/info'), getUserTokenHeader());

export const getUserPoints = () =>
    axios.get(createApiCall('/user/points'), getUserTokenHeader());

export const isUserAuthorized = () => !!getToken();

export const validateToken = () =>
    axios.get(createApiCall('/auth/check'), getUserTokenHeader());

export const saveUserData = (data: string) =>
    axios.post(createApiCall('/user/info/edit'), data, getUserTokenHeader());

export const login = (data: LoginData) =>
    axios.post(createApiCall('/auth/login'), data, getJSONHeader());

export const registerUser = (data: RegisterData) =>
    axios.post(createApiCall('/auth/register'), data, getJSONHeader());

export const confirmEmail = (data: Token) =>
    axios.post(createApiCall('/auth/confirm'), data, getJSONHeader());

export const resendConfirmationCode = (data: string) =>
    axios.post(createApiCall(`/auth/resend?email=${data}`));

export const getStageInfo = () => axios.get(createApiCall('/utils/stage_info'));

export const getNotifications = () =>
    axios.get(createApiCall('/notifications/get'), getUserTokenHeader());

export const getTeamInfo = () =>
    axios.get(createApiCall('/team/info'), getUserTokenHeader());

export const createTeam = (name: string) =>
    axios.post(createApiCall('/team/info'), name, getUserTokenHeader());

export const getTeamPoints = () =>
    axios.get(createApiCall('/team/points'), getUserTokenHeader());

export const editTeamInfo = (data: string) =>
    axios.post(
        createApiCall(`/team/info/edit`),
        {
            team_name: data,
        },
        getUserTokenHeader()
    );

export const getTeamInvitations = () =>
    axios.get(createApiCall('/team/invitations/all'), getUserTokenHeader());

export const getUsersRating = (type: string) =>
    axios.get(
        createApiCall(`/statistic/rating/teams?sortingType=${type}`),
        getUserTokenHeader()
    );

export const sendAnswer = (data: {answer: string; taskId: number}) =>
    axios.post(createApiCall('/tasks/check'), data, getUserTokenHeader());

export const sendAnswerFile = (data: FormData) =>
    axios.post(createApiCall('/tasks/check/file'), data, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
            'Content-type': 'multipart/form-data',
        },
    });

export const getTask = (id: number) =>
    axios.get(createApiCall(`/tasks/get/${id}`), getUserTokenHeader());

export const getTasks = () =>
    axios.get(createApiCall(`/tasks/get`), getUserTokenHeader());

export const cancelTeamInvitation = () =>
    axios.post(
        createApiCall('/team/invitations/cancel'),
        '{}',
        getUserTokenHeader()
    );

export const inviteUserToTeam = (data: string) =>
    axios.post(
        createApiCall('/team/invitations/invite'),
        {
            user_to_invite: data,
        },
        getUserTokenHeader()
    );

export const respondUserInvitation = (data: number, action: string) =>
    axios.post(
        createApiCall('/team/invitations/respond'),
        {
            action: action,
            id: data,
        },
        getUserTokenHeader()
    );

export const loadTasksForMap = () =>
    axios.get(createApiCall('/tasks/get'), getUserTokenHeader());

export const checkUserIsDead = () =>
    axios.get(createApiCall('/user/info/active'), getUserTokenHeader());

export const checkUserIsAdmin = () =>
    axios.get(createApiCall('/user/info/admin'), getUserTokenHeader());

export const getUserManualAnswers = () =>
    axios.get(
        createApiCall('/tasks/admin/answers-to-check'),
        getUserTokenHeader()
    );

export const respondUserAnswer = (data: string) =>
    axios.post(
        createApiCall('/tasks/admin/respond-answer'),
        data,
        getUserTokenHeader()
    );

export const loadUserStoreBalance = () =>
    axios.get(createApiCall('/shop/balance'), getUserTokenHeader());

export const loadStoreList = () =>
    axios.get(createApiCall('/shop/products'), getUserTokenHeader());

export const buyProduct = (data: {id: number}) =>
    axios.post(createApiCall('/shop/buy'), data, getUserTokenHeader());
