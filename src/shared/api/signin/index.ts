import { AxiosResponse } from "axios";

import { PostLoginRequestBody, PostLoginResponse } from "./type";
import { axiosPublicInstance } from "../instance";

export const postSignIn = async (data: PostLoginRequestBody) => {
  const response = await axiosPublicInstance.post<
    PostLoginRequestBody,
    AxiosResponse<PostLoginResponse>
  >("/auth/login", data);

  return response.data.result;
};
