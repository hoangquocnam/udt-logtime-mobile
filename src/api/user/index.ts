import { useMutation } from "react-query";
import { AuthRouter } from "../router";
import { IUserLogin } from "../../interfaces/user";

const postLogin = async (email: string, password: string) => {
  const response = await fetch(AuthRouter.login.value, {
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
  return useMutation<any, Error, IUserLogin>(
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
