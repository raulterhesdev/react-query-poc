import { useMutation, useQueryClient } from "react-query";
import {
	createProject,
	deleteProject,
	updateProject,
} from "../../utils/firebaseAPI";
import { useAuth } from "../../context/auth-context";

export const useCreateProject = () => {
	const queryClient = useQueryClient();

	const { user } = useAuth();
	const uid = user.user.uid;

	return useMutation((data) => createProject({ ...data, ownerUid: uid }), {
		onSuccess: () => {
			queryClient.invalidateQueries("projects");
		},
	});
};

export const useDeleteProject = () => {
	const queryClient = useQueryClient();
	return useMutation(deleteProject, {
		onSuccess: (projectId) => {
			queryClient.invalidateQueries("projects");
			queryClient.removeQueries(["project", projectId]);
			queryClient.removeQueries(["project tasks", projectId]);
			queryClient.invalidateQueries("tasks");
		},
	});
};

export const useUpdateProject = () => {
	const queryClient = useQueryClient();
	return useMutation(updateProject, {
		onSuccess: (data) => {
			queryClient.setQueryData(["project", data.id], data);
			queryClient.invalidateQueries("projects");
		},
	});
};
