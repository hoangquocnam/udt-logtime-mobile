import useAuth from "@/hooks/useAuth";

export const authHeader = async () => {
  const { getRefreshToken } = useAuth();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${await getRefreshToken()}`,
    "x-refresh-token": (await getRefreshToken()) || "",
  };
};

export type ErrorResponse = {
  status?: number;
  error?: string;
  message?: string;
};

export async function post<TResponse, TBody extends object>(
  url: string,
  body: TBody
): Promise<TResponse & ErrorResponse> {
  const options = await authHeader();
  const response = await fetch(url, {
    headers: {
      ...options,
    },
    method: "POST",
    body: JSON.stringify(body),
  });
  const responseJSON: Awaited<TResponse & ErrorResponse> =
    await response?.json();
  return responseJSON;
}

export async function get<TResponse>(
  url: string
): Promise<TResponse & ErrorResponse> {
  const options = await authHeader();
  const response = await fetch(url, {
    headers: {
      ...options,
    },
    method: "GET",
  });
  const responseJSON: Awaited<TResponse & ErrorResponse> =
    await response.json();
  return responseJSON;
}

export async function del<TResponse, TBody extends object>(
  url: string,
  body?: TBody
): Promise<TResponse & ErrorResponse> {
  const options = await authHeader();
  const response = await fetch(url, {
    headers: {
      ...options,
    },
    method: "DELETE",
    body: JSON.stringify(body),
  });
  const responseJSON: Awaited<TResponse & ErrorResponse> =
    await response?.json();
  return responseJSON;
}

export async function patch<TResponse, TBody extends object>(
  url: string,
  body: TBody
): Promise<TResponse & ErrorResponse> {
  const options = await authHeader();
  const response = await fetch(url, {
    headers: {
      ...options,
    },
    method: "PATCH",
    body: JSON.stringify(body),
  });
  const responseJSON: Awaited<TResponse & ErrorResponse> =
    await response?.json();
  return responseJSON;
}

export const validateResponse = (response: any) => {
  if (
    (response?.status && response?.status >= 400) ||
    response?.error ||
    response?.message
  ) {
    throw new Error(
      response?.message || response?.error || "Something went wrong"
    );
  }

  return response;
};
