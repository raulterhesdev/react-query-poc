import { useMutation, useQueryClient } from "react-query";
import { updateProject } from "../../utils/firebaseAPI";

export const useUpdateProject = () => {
	const queryClient = useQueryClient();
	return useMutation(updateProject, {
		onSuccess: (projectId) => {
			queryClient.invalidateQueries(["project", projectId]);
			queryClient.invalidateQueries("projects");
		},
	});
};
