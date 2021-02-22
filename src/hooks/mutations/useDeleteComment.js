import { useMutation, useQueryClient } from "react-query";

import { deleteComment } from "../../utils/firebaseAPI";

export const useDeleteComment = () => {
	const queryClient = useQueryClient();
	return useMutation(deleteComment, {
		onSuccess: ({ taskId }) => {
			queryClient.invalidateQueries(["tasks", taskId]);
		},
	});
};
