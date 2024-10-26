import {AxiosError} from 'axios';
import {BackendError} from 'src/app/types/global.ts';

export const getErrorMessage = (error: unknown | AxiosError<BackendError>) => {
    return (
        (error as AxiosError<BackendError>).response?.data.message ||
        'Неизвестная ошибка на сервере...'
    );
};
