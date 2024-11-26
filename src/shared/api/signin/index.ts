import { AxiosResponse } from 'axios';

import { PostLoginRequestBody, PostLoginResonse } from './type';
import { axiosPublicInstance } from '../instance';

export const postSignIn = async ({ email, password }: PostLoginRequestBody) => {
  const response = await axiosPublicInstance.post<PostLoginRequestBody, AxiosResponse<PostLoginResonse>>(
    '/auth/login',
    {
      email,
      password,
    }
  );

  return response.data;
};
