import axios from 'axios';

export default function initAxios() {
    axios.defaults.baseURL = 'http://95.163.182.127:8080';
    // это в ms таймаут, запомни и не ошибайся....
    axios.defaults.timeout = 600000;
}

export const apiVersion = '/api/v1';
