import { useMutation, useQueryClient } from "react-query";
import { updateTask } from "../../utils/firebaseAPI";

export const useUpdateTask = () => {
	const queryClient = useQueryClient();
	return useMutation(updateTask, {
		onSuccess: (data) => {
			queryClient.invalidateQueries(["project tasks", data.projectId]);
			queryClient.invalidateQueries("tasks");
			queryClient.setQueryData(["tasks", data.id], data);
		},
	});
};
