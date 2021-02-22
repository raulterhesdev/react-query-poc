import { useMutation, useQueryClient } from "react-query";
import {
	createTask,
	updateTask,
	deleteTask,
	createComment,
	deleteComment,
} from "../../utils/firebaseAPI";
import { useAuth } from "../../context/auth-context";

export const useCreateTask = () => {
	const queryClient = useQueryClient();

	const { user } = useAuth();
	const uid = user.user.uid;

	return useMutation((data) => createTask({ ...data, creatorUid: uid }), {
		onSuccess: (projectId) => {
			queryClient.invalidateQueries(["tasks", projectId]);
			queryClient.invalidateQueries("tasks");
		},
	});
};

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

export const useDeleteTask = () => {
	const queryClient = useQueryClient();
	return useMutation(deleteTask, {
		onSuccess: ({ projectId, taskId }) => {
			queryClient.invalidateQueries(["project tasks", projectId]);
			queryClient.invalidateQueries("tasks");
			queryClient.removeQueries(["tasks", taskId]);
		},
	});
};

export const useCreateComment = () => {
	const queryClient = useQueryClient();

	const { user } = useAuth();
	const uid = user.user.uid;

	return useMutation((data) => createComment({ ...data, uid }), {
		onSuccess: (taskId) => {
			queryClient.invalidateQueries(["tasks", taskId]);
		},
	});
};

export const useDeleteComment = () => {
	const queryClient = useQueryClient();
	return useMutation(deleteComment, {
		onSuccess: ({ taskId }) => {
			queryClient.invalidateQueries(["tasks", taskId]);
		},
	});
};
