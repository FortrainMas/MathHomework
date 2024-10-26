import Cookies from 'js-cookie';

export const ACCESS_TOKEN_COOKIE = 'token';

export const saveToken = (token: string) =>
    Cookies.set(ACCESS_TOKEN_COOKIE, token, {expires: 30});

export const getToken = () => Cookies.get(ACCESS_TOKEN_COOKIE);
export const deleteToken = () => Cookies.remove(ACCESS_TOKEN_COOKIE);
