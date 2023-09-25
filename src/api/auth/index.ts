import { useMutation, useQuery } from "react-query";
import { router } from "../router";
import { IUserLogin, IUserState } from "../../interfaces/user";
import { get, post } from "..";
import LocalStorage from "../../store/localStorage";

const postLogin = async (email: string, password: string) => {
  const response = await post<
    { data: { user: IUserState } },
    {
      email: string;
      password: string;
    }
  >(router.login.value, { email, password });
  return response?.data;
};

const postLoginV2 = async (email: string, password: string) => {
  const response = await post<
    { data: { user: IUserState } },
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
      user: IUserState;
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
      user: IUserState;
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

export const useMe = (options?: { enabled?: boolean }) => {
  return useQuery<
    {
      user: IUserState;
    },
    Error
  >({
    queryKey: ["me"],
    queryFn: async () => {
      const storage = LocalStorage.getInstance();
      const aToken = await storage.getItem("rToken");
      if (!aToken) {
        throw new Error("Token not found");
      }
      const email = await storage.getItem("email");
      const response = await get<{ data: { user: IUserState } }>(
        `https://app.udt.group/v1/auth/refresh-token/${email}`
      );
      if (response.status !== 200) {
        throw new Error(response.message);
      }
      return response.data;
    },
    onError: (error) => {
      console.error("useMe", error);
    },
    ...options,
  });
};
