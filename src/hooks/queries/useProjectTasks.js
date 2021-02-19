import { useQuery, useQueryClient } from "react-query";
import { getProjectTasks } from "../../utils/firebaseAPI";

export const useProjectTasks = (projectId) => {
	return useQuery(["tasks", projectId], () => getProjectTasks(projectId));
};
