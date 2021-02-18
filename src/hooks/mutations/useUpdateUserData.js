import { useMutation, useQueryClient } from "react-query";
import { updateUser } from "../../utils/firebaseAPI";

export const useUpdateUserData = () => {
	const queryClient = useQueryClient();
	return useMutation(updateUser, {
		onSuccess: (data) => {
			queryClient.invalidateQueries(["users", data.uid]);
		},
	});
};
