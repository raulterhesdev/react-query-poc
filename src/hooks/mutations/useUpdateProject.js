import { useMutation, useQueryClient } from "react-query";
import { updateProject } from "../../utils/firebaseAPI";

export const useUpdateProject = () => {
	const queryClient = useQueryClient();
	return useMutation(updateProject, {
		onSuccess: (data) => {
			queryClient.setQueryData(["project", data.id], data);

			queryClient.invalidateQueries("projects");
		},
	});
};
