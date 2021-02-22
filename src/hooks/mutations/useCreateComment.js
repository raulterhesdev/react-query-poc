import { useMutation, useQueryClient } from "react-query";
import { createComment } from "../../utils/firebaseAPI";
import { useAuth } from "../../context/auth-context";

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
