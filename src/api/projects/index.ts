import { useQuery } from "react-query";
import { router } from "../router";
import { authHeader } from "..";
import { ProjectDetail } from "../../interfaces/project";

type DataProjects = {
  projects: ProjectDetail[];
};

const getProjects = async (): Promise<DataProjects> => {
  const auth = await authHeader();
  const response = await fetch(router.projects.listOfUser.value, {
    method: "GET",
    headers: auth,
  });
  const responseJson: Awaited<{
    message: string;
    data: DataProjects;
  }> = await response.json();
  if (response.status !== 200) {
    throw new Error(responseJson.message);
  }
  return responseJson.data;
};

export const useGetProjects = () => {
  return useQuery<DataProjects, Error>(
    [router.projects.listOfUser.value],
    () => getProjects(),
    {
      onError: (error) => {
        console.error("useGetProjects", error);
      },
    }
  );
};

const getProject = async (id: string): Promise<ProjectDetail> => {
  const auth = await authHeader();
  const response = await fetch(router.projects.detail.value(id), {
    method: "GET",
    headers: auth,
  });
  const responseJson: Awaited<{
    message: string;
    data: {
      project: ProjectDetail;
    };
  }> = await response.json();
  if (response.status !== 200) {
    throw new Error(responseJson.message);
  }
  return responseJson.data.project;
};

export const useGetProject = (id: string) => {
  return useQuery<ProjectDetail, Error>(
    [router.projects.listOfUser.value],
    () => getProject(id),
    {
      onError: (error) => {
        console.error("useGetProject", error);
      },
    }
  );
};
