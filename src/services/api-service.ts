import axios, { AxiosError, AxiosResponse } from 'axios';

export type ResponseError = Omit<AxiosError, 'response'> & {
  response: AxiosResponse<{ error: string }>
};

export const isResponseError = (err: unknown | ResponseError): err is ResponseError => Boolean(
  err instanceof AxiosError
  && err.response
  && err.response.data.error,
);

export const formatError = (err: unknown): string => {
  if (isResponseError(err)) {
    return err.response.data.error;
  } if (err instanceof Error) {
    return err.message;
  }
  return err as string;
};

const API_SERVER_ADDRESS = process.env.REACT_APP_API_SERVER_ADDRESS_NEW;

if (API_SERVER_ADDRESS === undefined) {
  throw new Error('Please declare REACT_APP_API_SERVER_ADDRESS value in /.env.local');
}

const ApiService = axios.create({
  baseURL: API_SERVER_ADDRESS,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

export default ApiService;
