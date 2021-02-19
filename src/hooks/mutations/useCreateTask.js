import { useMutation, useQueryClient } from "react-query";
import { createTask } from "../../utils/firebaseAPI";
import { useAuth } from "../../context/auth-context";

export const useCreateTask = () => {
	const queryClient = useQueryClient();

	const { user } = useAuth();
	const uid = user.user.uid;

	return useMutation((data) => createTask({ ...data, creatorUid: uid }), {
		onSuccess: (projectId) => {
			queryClient.invalidateQueries(["tasks", projectId]);
		},
	});
};
