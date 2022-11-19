export function getFullName(
  firstName?: string,
  lastName?: string,
  middleName?: string
): string {
  let nameArray: (string | undefined)[] = [firstName, middleName, lastName];
  nameArray = nameArray.filter((name) => name);

  return nameArray.join(" ");
}
