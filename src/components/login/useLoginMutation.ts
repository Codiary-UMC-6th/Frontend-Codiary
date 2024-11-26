import { useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';

import { AxiosError } from 'axios';

import { postSignIn } from '../../shared/api/signin';
import { axiosInstance } from '../../shared/api/instance';
import { ACCESS_TOKEN_KEY, HTTP_STATUS_CODE } from '../../shared/constant/api';
import { PATH } from '../../shared/constant/path';

export const useLoginMutation = () => {

  const navigate = useNavigate();

  return useMutation({
    mutationFn: postSignIn,

    onSuccess: ({ data: { accessToken } }) => {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

      axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;

      navigate(PATH.ROOT);
    },

    onError: (error: AxiosError) => {
      if (!error.response) return;

      const { status } = error.response;

      if (status === HTTP_STATUS_CODE.BAD_REQUEST) {
        alert('error');
        return;
      }
      if (status === HTTP_STATUS_CODE.NOT_FOUND) {
        alert('error');
        return;
      }
    },
  });
};
