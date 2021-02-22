import { useQuery, useQueryClient } from "react-query";
import { getTask } from "../../utils/firebaseAPI";

export const useTask = (taskId) => {
	const queryClient = useQueryClient();
	return useQuery(["tasks", taskId], () => getTask(taskId));
};
