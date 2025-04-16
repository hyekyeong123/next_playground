import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8045",
  withCredentials: true,
  headers: {
    conferenceIdx:12724,
    Authorization: `Bearer eyJzZXJ2aWNlX3R5cGUiOiJwY29fYWRtaW4iLCJhbGciOiJIUzM4NCJ9.eyJqdGkiOiI4M2VmNzY1MC0xYzdmLTRkMTEtODZkNS1lMTBkOTg2MzAyMDgiLCJpYXQiOjE3NDQwODkwMzMsInd1c2VyX2lkeCI6ODY4LCJleHAiOjE3NDQxMDcwMzN9.08dahpwES6Dx9P4NkAZCCO1GvB9BKbboNMcCIQd_osH5AfSDqv01l3_CTbwmTZxq`,
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