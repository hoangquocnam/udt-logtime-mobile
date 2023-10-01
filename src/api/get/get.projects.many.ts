import { useQuery } from "react-query";
import { router } from "../router";
import { get } from "..";
import { ProjectDetail } from "../../interfaces/project";

type DataProjects = {
  projects: ProjectDetail[];
};

const getProjects = async (): Promise<DataProjects> => {
  const response = await get<{ data: DataProjects }>(
    router.projects.listOfUser.value,
    {
      v2: true,
    }
  );
  if (response.error) {
    throw new Error(response.error);
  }
  return response.data;
};

export const useGetProjects = () => {
  return useQuery<DataProjects, Error>(
    [router.projects.listOfUser.value],
    () => getProjects(),
    {
      onError: (error) => {
        console.error("useGetProjects", error);
      },
      refetchOnMount: "always",
      keepPreviousData: true,
    }
  );
};
