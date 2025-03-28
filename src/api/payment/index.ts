import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8045",
  withCredentials: true,
  headers: {
    conferenceIdx:4862,
    Authorization: `Bearer eyJzZXJ2aWNlX3R5cGUiOiJwY29fY2xpZW50IiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiI0MzlmM2VkMC1jMGZlLTQ3MmYtODVkZi0zNjQ2MDJiODY0YzUiLCJpYXQiOjE3NDEzMzA5NjgsInd1c2VyX2lkeCI6MTI0MywiZXhwIjoxNzQzMTMwOTY4fQ.EGy_yFbPI6sSmVxkT6TjxblhI88XwW39YeWLGVPaLA8`, //
  },
});

export const sendPaymentRequest = (param: {
  amount: number;
  orderIdx: number;
  tossOrderId: string;
}): Promise<unknown> => {
  return axiosInstance
  .post(`/api/pco/client/attendee/payment/prepare-toss`, param)
};