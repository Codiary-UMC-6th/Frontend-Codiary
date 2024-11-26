import { axiosPublicInstance } from '../instance';
import { UserInfo } from './type';

export const postSignup = async (formData: UserInfo) => {
  const response = await axiosPublicInstance.post<UserInfo>('/auth/sign_up', formData);

  return response;
};
