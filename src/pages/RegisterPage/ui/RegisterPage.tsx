import styles from './RegisterPage.module.scss';
import {FC} from 'react';
// import {getRandomWebUrl} from "src/shared/static/RegisterWord.ts";
import {SubmitHandler, useForm} from 'react-hook-form';
import {setShowCodeInput} from 'src/entities/User/userSlice.ts';
import {useAppDispatch, useAppSelector} from 'src/shared/utils/hooks/redux.ts';
// import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import {registerThunk} from 'src/entities/User/userThunks.ts';
import {useNavigate} from 'react-router-dom';

interface RegisterPageProps {
    className?: string;
}

export type FormValues = {
    contact_link: string;
    name: string;
    email: string;
    password: string;
    token: string;
};

export const RegisterPage: FC<RegisterPageProps> = ({}) => {
    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm<FormValues>({
        mode: 'onBlur',
    });

    const dispatch = useAppDispatch();

    const show = useAppSelector(state => state.user.showCodeInput);

    const navigate = useNavigate();
    if (show) navigate('/code');

    const onSubmit: SubmitHandler<FormValues> = data => {
        dispatch(registerThunk(data));
    };

    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.authLoginPassword}>
                    <div className={styles.authLogin}>
                        <input
                            placeholder='ИМЯ'
                            className={styles.authLoginSquare}
                            {...register('name', {
                                required:
                                    '...Имя: Фамилия Фамилия: Имя... ',
                                pattern: {
                                    value: /[a-zA-Z_]+[^\s]*/,
                                    message: '...Введите имя на латинице',
                                }
                            })}
                        />
                        {errors?.name && (
                            <div className={styles.authError}>
                                {errors.name.message}
                            </div>
                        )}
                    </div>
                    <div className={styles.authLogin}>
                        <input
                            placeholder='Email НГУ'
                            className={styles.authLoginSquare}
                            {...register('email', {
                                required: '...Голубь не долетит... ',
                                pattern: {
                                    value: /[a-zA-Z][^\s]*@g\.nsu\.ru/,
                                    message:
                                        '...Укажи почту от аккаунта НГУ',
                                },
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
                            className={styles.authLoginSquare}
                            placeholder='Пароль'
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
                    <div className={styles.authLogin}>
                        <input
                            placeholder='Ссылка на TG'
                            className={styles.authLoginSquare}
                            {...register('contact_link', {
                                required: '...Отдай тг...',
                            })}
                        />
                        {errors?.contact_link && (
                            <div className={styles.authError}>
                                {errors.contact_link.message}
                            </div>
                        )}
                    </div>
                    <div className={styles.butts}>
                        <button
                            onClick={() => navigate('/login')}
                            className={styles.authLoginButton}>
                            ЕСТЬ АККАУНТ?ВОЙТИ
                        </button>
                        <button
                            type="submit"
                            className={styles.authLoginButton}>
                            ПОЛУЧИТЬ КОД
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
