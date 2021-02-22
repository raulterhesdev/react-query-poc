import { useMutation, useQueryClient } from "react-query";
import { updateTask } from "../../utils/firebaseAPI";

export const useUpdateTask = () => {
	const queryClient = useQueryClient();
	return useMutation(updateTask, {
		onSuccess: (projectId) => {
			queryClient.invalidateQueries(["tasks", projectId]);
		},
	});
};
