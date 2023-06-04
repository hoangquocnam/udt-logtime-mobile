import useAuth from "../hooks/useAuth";

const authHeader = () => {
  const { getAccessToken, getRefreshToken } = useAuth();
  return {
    Authorization: `Bearer ${getAccessToken()}`,
    "x-refresh-token": getRefreshToken(),
  };
};
