import { IUserProfile } from "@/interfaces/user";
import { useQuery } from "react-query";
import { ErrorResponse, get } from "..";
import { router } from "../router";

export type TProfileResponse = {
  data: {
    user: IUserProfile;
  };
};

export const getProfile = async () => {
  const response = await get<TProfileResponse>(router.profile.profile.value, {
    v2: true,
  });
  if (response?.error) {
    throw new Error(response.error);
  }
  return response?.data?.user;
};

export const useProfile = ({ enabled = true }) => {
  return useQuery<IUserProfile, Error, IUserProfile, any>(
    [router.profile.profile.value],
    () => getProfile(),
    {
      enabled,
    }
  );
};
