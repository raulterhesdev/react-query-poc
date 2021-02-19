import { useQuery, useQueryClient } from "react-query";
import { getProject } from "../../utils/firebaseAPI";

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
