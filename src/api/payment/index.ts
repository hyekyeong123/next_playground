import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8045",
  withCredentials: true,
  headers: {
    conferenceIdx:4862,
    Authorization: `Bearer eyJzZXJ2aWNlX3R5cGUiOiJwY29fY2xpZW50IiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiI5ZTdlYjlhOC1kOWIxLTRiNzYtOTJhYS02YmEyMmZlYzkwN2QiLCJpYXQiOjE3NDEyMzA0MTIsInd1c2VyX2lkeCI6MTI0MywiZXhwIjoxNzQxMjQ4NDEyfQ.5a2G2uJeUPuNp58vHKJKKKsYsbxudJpBNd46iwEFYZI`, //
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