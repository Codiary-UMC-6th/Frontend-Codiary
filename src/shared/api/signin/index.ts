import { AxiosResponse } from "axios";

import { PostLoginRequestBody, PostLoginResponse } from "./type";
import { axiosPublicInstance } from "../instance";

export const postSignIn = async ({ email, password }: PostLoginRequestBody) => {
  const response = await axiosPublicInstance.post<
    PostLoginRequestBody,
    AxiosResponse<PostLoginResponse>
  >("/auth/login", {
    email,
    password,
  });

  return response.data.result;
};
