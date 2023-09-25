import { useQuery } from "react-query";
import { router } from "../router";
import { get } from "..";
import { ProjectDetail } from "../../interfaces/project";

type DataProjects = {
  projects: ProjectDetail[];
};

const getProjects = async (): Promise<DataProjects> => {
  const response = await get<{ data: DataProjects }>(
    router.projects.listOfUser.value
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

const getProject = async (id: string): Promise<ProjectDetail> => {
  const response = await get<{
    data: {
      project: ProjectDetail;
    };
  }>(router.projects.detail.value(id));
  if (response.error) {
    throw new Error(response.error);
  }
  return response.data.project;
};

export const useGetProject = (id: string) => {
  return useQuery<ProjectDetail, Error>(
    [router.projects.detail.value(id)],
    () => getProject(id),
    {
      onError: (error) => {
        console.error("useGetProject", error);
      },
    }
  );
};
