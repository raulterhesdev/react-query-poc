import { useQuery, useQueryClient } from "react-query";
import { getProject, getProjects } from "../../utils/firebaseAPI";

export const useProjects = () => {
	return useQuery("projects", getProjects);
};

export const useProject = (projectId) => {
	const queryClient = useQueryClient();
	return useQuery(["project", projectId], () => getProject(projectId), {
		placeholderData: () => {
			return queryClient
				.getQueryData("projects")
				?.find((p) => p.id === projectId);
		},
	});
};
