import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: "http://localhost:8045",
    withCredentials: true,
    headers: {
        conferenceIdx:4862,
        Authorization: `Bearer eyJzZXJ2aWNlX3R5cGUiOiJwY29fY2xpZW50IiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiI0MzlmM2VkMC1jMGZlLTQ3MmYtODVkZi0zNjQ2MDJiODY0YzUiLCJpYXQiOjE3NDEzMzA5NjgsInd1c2VyX2lkeCI6MTI0MywiZXhwIjoxNzQzMTMwOTY4fQ.EGy_yFbPI6sSmVxkT6TjxblhI88XwW39YeWLGVPaLA8`, //
    },
});

const authAxiosInstance: AxiosInstance = axios.create({
    baseURL: "http://localhost:8040", // auth 서버 연동
    withCredentials: true,
    headers: {
        conferenceIdx:4862,
        Authorization: `Bearer eyJzZXJ2aWNlX3R5cGUiOiJwY29fY2xpZW50IiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiI0MzlmM2VkMC1jMGZlLTQ3MmYtODVkZi0zNjQ2MDJiODY0YzUiLCJpYXQiOjE3NDEzMzA5NjgsInd1c2VyX2lkeCI6MTI0MywiZXhwIjoxNzQzMTMwOTY4fQ.EGy_yFbPI6sSmVxkT6TjxblhI88XwW39YeWLGVPaLA8`, //
    },
});

