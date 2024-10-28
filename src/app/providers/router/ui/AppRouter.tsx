import {Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import {TaskPage} from 'src/pages/TaskPage';
import {TasksPage} from 'src/pages/TasksPage/ui/TasksPage.tsx';
import {RegisterPage} from 'src/pages/RegisterPage';
import {LoginPage} from 'src/pages/LoginPage';
import RequireAuth from 'src/app/providers/routerHocs/requireAuth/ui/RequireAuth.tsx';
import {ConfirmCodePage} from 'src/pages/ConfirmCodePage';
import {NewsPage} from 'src/pages/NewsPage';
import {ProfilePage} from 'src/pages/ProfilePage';
import {RequireNotAuth} from 'src/app/providers/routerHocs/requireNotAuth';
import {CreateTeamPage} from 'src/pages/createTeamPage';
import {NewPage} from 'src/pages/newPage/ui/NewPage.tsx';
import {Loader} from 'src/shared/ui/Loader';
import {ShopPage} from 'src/pages/shopPage/ui/ShopPage.tsx';

export const AppRouter = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route
                    path="/registration"
                    element={
                        <RequireNotAuth>
                            <RegisterPage />
                        </RequireNotAuth>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <RequireNotAuth>
                            <LoginPage />
                        </RequireNotAuth>
                    }
                />
                <Route
                    path="code"
                    element={
                        <RequireNotAuth>
                            <ConfirmCodePage />
                        </RequireNotAuth>
                    }
                />
                <Route path="/*" element={
                  <RequireNotAuth>
                    <Routes>
                        <Route index element={<TasksPage />} />
                        <Route path="task/:taskId" element={<TaskPage />} />
                        <Route path="/news" element={<NewsPage />} />
                        <Route path="/shop" element={<ShopPage />} />
                        <Route path="/team" element={<CreateTeamPage />} />
                    </Routes>
                  </RequireNotAuth>
                }></Route>

                {/* <Route path="/" element={<RequireAuth />}>
                    <Route index element={<TasksPage />} />
                    <Route path="task/:taskId" element={<TaskPage />} />
                    <Route path="/news" element={<NewsPage />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/team" element={<CreateTeamPage />} />
                </Route> */}
            </Routes>
        </Suspense>
    );
};
