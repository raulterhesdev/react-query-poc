import { useMutation, useQueryClient } from "react-query";
import { updateProject } from "../../utils/firebaseAPI";

export const useUpdateProject = () => {
	const queryClient = useQueryClient();
	return useMutation(updateProject, {
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries(["project", variables.id]);
			queryClient.invalidateQueries("projects");
		},
	});
};
