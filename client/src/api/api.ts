import axios from 'axios';

export const apiPost = async <T, G>(path: string, data?: G) => {
    return axios
        .post<T>(`${process.env.NEXT_PUBLIC_API_ENDPOINT ?? ''}${path}`, data, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY ?? ''}` },
        })
        .then((res) => res.data);
};

export const apiGet = async <T>(path: string): Promise<T> => {
    return axios
        .get<T>(`${process.env.NEXT_PUBLIC_API_ENDPOINT ?? ''}${path}`, {
            withCredentials: true,
        })
        .then((res) => res.data);
};
