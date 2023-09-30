import { useMutation } from "react-query";
import { router } from "../router";
import { IUserLogin, IUserRefreshToken } from "../../interfaces/user";
import { post } from "..";

const postLogin = async (email: string, password: string) => {
  const response = await post<
    { data: { user: IUserRefreshToken } },
    {
      email: string;
      password: string;
    }
  >(router.login.value, { email, password });
  return response?.data;
};

const postLoginV2 = async (email: string, password: string) => {
  const response = await post<
    { data: { user: IUserRefreshToken } },
    {
      email: string;
      password: string;
    }
  >(router.login.v2.value, { email, password });
  return response?.data;
};

export const usePostLogin = ({ onError }) => {
  return useMutation<
    {
      user: IUserRefreshToken;
    },
    Error,
    IUserLogin
  >(
    (payload: IUserLogin) => {
      return postLogin(payload.email, payload.password);
    },
    {
      mutationKey: ["login"],
      onError: (error) => {
        onError(error);
      },
    }
  );
};

export const usePostLoginV2 = ({ onError }) => {
  return useMutation<
    {
      user: IUserRefreshToken;
    },
    Error,
    IUserLogin
  >(
    (payload: IUserLogin) => {
      return postLoginV2(payload.email, payload.password);
    },
    {
      mutationKey: ["loginV2"],
      onError: (error) => {
        onError(error);
      },
    }
  );
};
