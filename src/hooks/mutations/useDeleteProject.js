import { useMutation, useQueryClient } from "react-query";
import { deleteProject } from "../../utils/firebaseAPI";

export const useDeleteProject = () => {
	const queryClient = useQueryClient();
	return useMutation(deleteProject, {
		onSuccess: () => {
			queryClient.invalidateQueries("projects");
		},
	});
};
