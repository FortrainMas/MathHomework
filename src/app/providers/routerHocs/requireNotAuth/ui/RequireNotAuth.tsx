import * as React from 'react';
import {useAppSelector} from 'src/shared/utils/hooks/redux.ts';
import {PageLoader} from 'src/shared/ui/pageLoader';
import {Navigate} from 'react-router-dom';

export const RequireNotAuth = ({children}: {children: React.ReactNode}) => {
    const isAuth = useAppSelector(state => state.user.isAuth);
    const loading = useAppSelector(state => state.user.status);

    if (loading === 'loading user info') return <PageLoader />;

    if (!isAuth) {
        return children;
    } else {
        return <Navigate to={'/'} />;
    }
};
