import { RANDOM_USER_API } from "../../constants";
import { IUser } from "../../interfaces";

export async function fetchUsers(
  numberUser: number = 10
): Promise<{ data: IUser[] }> {
  const response = await fetch(`${RANDOM_USER_API}${numberUser}`, {
    method: "GET",
  });

  const jsonResponse = await response.json();

  return { data: jsonResponse.results };
}
