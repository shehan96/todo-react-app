import { useMutation, useQuery } from 'react-query';
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

export const useGetMoreTodos = () => {
  return useMutation((noOfResults) => {
    return ApiClient.get(`https://randomuser.me/api/?results=${noOfResults}`);
  });
};
