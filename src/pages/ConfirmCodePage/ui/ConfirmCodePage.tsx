import styles from './ConfirmCodePage.module.scss';
import {FC} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useAppDispatch, useAppSelector} from 'src/shared/utils/hooks/redux.ts';
import {confirmEmailThunk} from 'src/entities/User/userThunks.ts';
import {useNavigate} from 'react-router-dom';

interface RegisterPageProps {
    className?: string;
}

export type FormValues = {
    token: string;
};

export const ConfirmCodePage: FC<RegisterPageProps> = ({}) => {
    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm<FormValues>({
        mode: 'onBlur',
    });

    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<FormValues> = data => {
        dispatch(confirmEmailThunk(data));
    };

    const navigate = useNavigate();

    const isAuth = useAppSelector(state => state.user.isAuth);
    if (isAuth) navigate('/');

    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.authLoginPassword}>
                    <div className={styles.authPassword}>
                        <input
                            placeholder="Код подтверждения"
                            className={styles.authLoginSquare}
                            type="text"
                            {...register('token', {
                                required: 'И Чё?',
                            })}
                        />
                        {errors?.token && (
                            <div className={styles.authError}>
                                {errors.token.message}
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className={styles.authLoginButton}>
                        Войти
                    </button>
                </div>
            </form>
        </div>
    );
};
