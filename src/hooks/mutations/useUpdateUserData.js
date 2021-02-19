import { useMutation, useQueryClient } from "react-query";
import { updateUser } from "../../utils/firebaseAPI";

export const useUpdateUserData = () => {
	const queryClient = useQueryClient();
	return useMutation(updateUser, {
		onSuccess: (uid) => {
			queryClient.invalidateQueries(["users", uid]);
		},
	});
};
