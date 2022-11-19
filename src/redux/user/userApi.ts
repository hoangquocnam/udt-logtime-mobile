import { IUser } from "../../interfaces";

export async function fetchUsers(
  numberUser: number = 10
): Promise<{ data: IUser[] }> {
  const response = await fetch(
    `https://randomuser.me/api/?results=${numberUser}`,
    {
      method: "GET",
    }
  );

  const jsonResponse = await response.json();

  return { data: jsonResponse.results };
}
