import useAuth from "@/hooks/useAuth";

export const authHeader = async (v2 = false) => {
  const { getRefreshToken, getRefreshTokenV2 } = useAuth();
  if (v2) {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await getRefreshTokenV2()}`,
      "x-refresh-token": (await getRefreshTokenV2()) || "",
    };
  }
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
  body: TBody,
  options?: { v2?: boolean }
): Promise<TResponse & ErrorResponse> {
  const optionsAuth = await authHeader(options?.v2);
  const response = await fetch(url, {
    headers: {
      ...optionsAuth,
    },
    method: "POST",
    body: JSON.stringify(body),
  });
  const responseJSON: Awaited<TResponse & ErrorResponse> =
    await response?.json();
  return responseJSON;
}

export async function get<TResponse>(
  url: string,
  options?: { v2?: boolean }
): Promise<TResponse & ErrorResponse> {
  const optionsAuth = await authHeader(options?.v2);
  const response = await fetch(url, {
    headers: {
      ...optionsAuth,
    },
    method: "GET",
  });
  const responseJSON: Awaited<TResponse & ErrorResponse> =
    await response.json();
  return responseJSON;
}

export async function del<TResponse, TBody extends object>(
  url: string,
  body?: TBody,
  options?: { v2?: boolean }
): Promise<TResponse & ErrorResponse> {
  const optionsAuth = await authHeader(options?.v2);
  const response = await fetch(url, {
    headers: {
      ...optionsAuth,
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
  body: TBody,
  options?: { v2?: boolean }
): Promise<TResponse & ErrorResponse> {
  const optionsAuth = await authHeader(options?.v2);
  const response = await fetch(url, {
    headers: {
      ...optionsAuth,
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
