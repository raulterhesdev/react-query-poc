import { useQuery, useQueryClient } from "react-query";
import { getProjectTasks, getTasks, getTask } from "../../utils/firebaseAPI";

export const useProjectTasks = (projectId) => {
	return useQuery(["project tasks", projectId], () =>
		getProjectTasks(projectId)
	);
};

export const useTasks = () => {
	return useQuery("tasks", getTasks);
};

export const useTask = (taskId) => {
	const queryClient = useQueryClient();

	return useQuery(["tasks", taskId], () => getTask(taskId), {
		placeholderData: () => {
			return queryClient.getQueryData("tasks")?.find((p) => p.id === taskId);
		},
	});
};

export const usePrefetchTask = () => {
	const queryClient = useQueryClient();
	const prefetchTask = (taskId) => {
		queryClient.prefetchQuery(["tasks", taskId], () => getTask(taskId), {
			staleTime: 30 * 1000,
		});
	};

	return [prefetchTask];
};

export const usePrefetchProjectTasks = () => {
	const queryClient = useQueryClient();
	const prefetchTasks = (projectId) => {
		queryClient.prefetchQuery(
			["project tasks", projectId],
			() => getProjectTasks(projectId),
			{
				staleTime: 30 * 1000,
			}
		);
	};

	return [prefetchTasks];
};
