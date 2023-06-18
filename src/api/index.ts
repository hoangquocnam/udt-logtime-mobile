import useAuth from "../hooks/useAuth";

export const authHeader = async () => {
  const { getAccessToken, getRefreshToken } = useAuth();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${await getRefreshToken()}`,
    "x-refresh-token": await getRefreshToken() || '',
  };
};
