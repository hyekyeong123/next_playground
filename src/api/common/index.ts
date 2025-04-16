import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: "http://localhost:8045",
    withCredentials: true,
    headers: {
        conferenceIdx:12724,
        Authorization: `Bearer eyJzZXJ2aWNlX3R5cGUiOiJwY29fYWRtaW4iLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhODVkOGE2Yy04NWNlLTQzMjAtOGY3My1jN2JjNWRlMzhkZmQiLCJpYXQiOjE3NDQ3Njc4OTgsInd1c2VyX2lkeCI6MTMxMywiZXhwIjoxNzQ0Nzg1ODk4fQ.Mhi9N07k70-3ELm7KZXZHJHNXfHKuetUwyYzoHbcrWY`, //
    },
});

export const downloadFile = (param: {
    conferenceIdx: number;
}): Promise<Blob> => {
    const url = "/api/pco/admin/attendee/excel";
    return axiosInstance
        .post(url, param, {
            headers: {
                'Content-Type': 'application/json', // 또는 서버가 요구하는 타입
                'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            },
            responseType: 'blob',
        })
        .then((response) => {
            return response.data;
        });
};