import styles from './LoginPage.module.scss';
import {FC} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from 'src/shared/utils/hooks/redux.ts';
import {loginThunk} from 'src/entities/User/userThunks.ts';

interface RegisterPageProps {
    className?: string;
}

export type FormValues = {
    email: string;
    password: string;
};

export const LoginPage: FC<RegisterPageProps> = ({}) => {
    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm<FormValues>({
        mode: 'onBlur',
    });

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isAuth = useAppSelector(state => state.user.isAuth);

    if (isAuth) {
        navigate('/');
    }

    const onSubmit: SubmitHandler<FormValues> = data => {
        dispatch(loginThunk(data));
    };

    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.authLoginPassword}>
                    <div className={styles.authLogin}>
                        <input
                            placeholder='Email'
                            className={styles.authLoginSquare}
                            {...register('email', {
                                required: 'Почту забыл... ',
                            })}
                        />
                        {errors?.email && (
                            <div className={styles.authError}>
                                {errors.email.message}
                            </div>
                        )}
                    </div>
                    <div className={styles.authPassword}>
                        <input
                            placeholder='Пароль'
                            className={styles.authLoginSquare}
                            type="password"
                            {...register('password', {
                                required:
                                    '...Пароль мне самому придумывать?...',
                                minLength: {
                                    value: 8,
                                    message:
                                        '...Слишком короткий...) пароль)',
                                },
                            })}
                        />
                        {errors?.password && (
                            <div className={styles.authError}>
                                {errors.password.message}
                            </div>
                        )}
                    </div>
                    <div className={styles.butts}>
                        <button
                            type="submit"
                            onClick={() => navigate('/registration')}
                            className={styles.authLoginButton}>
                            НЕТ АККА? СОЗДАЙ!
                        </button>
                        <button className={styles.authLoginButton}>
                            Войти
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
