import { COMPANY_URL } from "../api/router";

export function getFullName(
  firstName?: string,
  lastName?: string,
  middleName?: string
): string {
  let nameArray: (string | undefined)[] = [firstName, middleName, lastName];
  nameArray = nameArray.filter((name) => name);

  return nameArray.join(" ");
}

export const getImageUrl = (image: string) => {
  return image
    ? `${COMPANY_URL}/images/${image}`
    : `https://via.placeholder.com/150`;
};

export const formatCash = (num: number) => {
  // split by dot
  return num.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};

export const formatDecimal = (num: number) => {
  return num.toLocaleString("it-IT", { minimumFractionDigits: 2 });
}
