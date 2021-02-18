import { useMutation, useQueryClient } from "react-query";
import { createProject } from "../../utils/firebaseAPI";
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
