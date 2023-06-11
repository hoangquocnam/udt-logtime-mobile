import { useMutation, useQuery } from "react-query";
import { router } from "../router";
import { IUserLogin, IUserState } from "../../interfaces/user";
import { authHeader } from "..";

const postLogin = async (email: string, password: string) => {
  const response = await fetch(router.login.value, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const responseJson = await response.json();
  if (response.status !== 200) {
    throw new Error(responseJson.message);
  }
  return responseJson.data;
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
      console.info("POST", router.login.value);
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

export const useMe = () => {
  return useQuery<
    {
      user: IUserState;
    },
    Error
  >({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await fetch(
        "https://app.udt.group/v1/auth/refresh-token/hoangquocnam021117@gmail.com",
        {
          method: "GET",
          headers: await authHeader(),
        }
      );
      const responseJson = await response.json();
      if (response.status !== 200) {
        throw new Error(responseJson.message);
      }
      return responseJson.data;
    },
    onError: (error) => {
      console.error("useMe", error);
    },
  });
};
