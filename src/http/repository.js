import { useQuery } from 'react-query';
import { ApiClient } from './api-client';

export const useGetTodos = (noOfResults) => {
  return useQuery(
    'todos',
    () => {
      console.info('server request sent.');
      return ApiClient.get(`https://randomuser.me/api/?results=${noOfResults}`);
    },
    { refetchOnWindowFocus: false }
  );
};

export const useGetTodosTest = (noOfResults) => {
  return useQuery(
    ['todos', noOfResults],
    () => {
      console.info('server request sent.');
      return ApiClient.get(`https://randomuser.me/api/?results=${noOfResults}`);
    },
    { refetchOnWindowFocus: false }
  );
};