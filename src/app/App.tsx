import './styles/index.scss';
import {AppRouter} from 'src/app/providers/router';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from 'src/shared/utils/hooks/redux.ts';
import {getUserInfoThunk} from 'src/entities/User/userThunks.ts';
import {getToken} from 'src/shared/api/Cookie.ts';
import {setStatus} from 'src/entities/User/userSlice.ts';
import {getTeamInfoThunk} from 'src/entities/Team/teamThunks.ts';

function App() {
    const dispatch = useAppDispatch();

    const user = useAppSelector(state => state?.user.user);

    useEffect(() => {
        if (getToken()) {
            dispatch(getUserInfoThunk());
            dispatch(getTeamInfoThunk());
        } else dispatch(setStatus('idle'));
    }, []);

    if (user && user.content.points < 6 && false)
        return (
            <div
                style={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 48,
                    fontFamily: 'PT Mono',
                }}>
                ВЫ МЕРТВЫ!
            </div>
        );

    return (
        <div>
            <AppRouter />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                progressStyle={{
                    color: 'red',
                }}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="dark"
            />
        </div>
    );
}

export default App;
