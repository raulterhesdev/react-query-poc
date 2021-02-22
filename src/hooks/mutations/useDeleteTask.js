import { useMutation, useQueryClient } from "react-query";
import { deleteTask } from "../../utils/firebaseAPI";

export const useDeleteTask = () => {
	const queryClient = useQueryClient();
	return useMutation(deleteTask, {
		onSuccess: ({ projectId, taskId }) => {
			queryClient.invalidateQueries(["project tasks", projectId]);
			queryClient.removeQueries(["tasks", taskId]);
		},
	});
};
