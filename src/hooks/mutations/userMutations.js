import { useMutation, useQueryClient } from "react-query";
import { createUser, updateUser } from "../../utils/firebaseAPI";

export const useCreateUserData = () => {
	return useMutation(createUser);
};

export const useUpdateUserData = () => {
	const queryClient = useQueryClient();
	return useMutation(updateUser, {
		onSuccess: (data) => {
			queryClient.setQueryData(["users", data.uid], data);
		},
	});
};
