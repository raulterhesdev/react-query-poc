import { useQuery } from "react-query";
import { getTask } from "../../utils/firebaseAPI";

export const useTask = (taskId) => {
	return useQuery(["tasks", taskId], () => getTask(taskId));
};
