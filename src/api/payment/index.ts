import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://localhost:8045",
  withCredentials: true,
  headers: {
    Authorization: `Bearer eyJzZXJ2aWNlX3R5cGUiOiJwYXJ0bmVyX2VtcGxveV9jbGllbnQiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJlZTk4YzI2Mi05YWM1LTQ0MWQtOGI4ZC1hOGVkN2IzNWUxNDUiLCJpYXQiOjE3MzQ0MTExMjcsInd1c2VyX2lkeCI6MTI5MSwiZXhwIjoxNzM0NTkxMTI3fQ.QwvId86U0Bu179GEmIknQIlkK9c637EJqfnz848LIIk`, //
  },
});

export const sendPaymentRequest = (param: {
  amount: number;
  orderIdx: number;
  tossOrderId: string;
}): Promise<unknown> => {
  return axiosInstance
  .post(`/api/pco/client/attendee/payment/prepare-toss`, param)
  .then((response) => {
    return response.data.content;
  });
};