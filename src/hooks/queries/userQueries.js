import { useQuery, useQueryClient } from "react-query";
import { getUser, getUsers } from "../../utils/firebaseAPI";
import { useAuth } from "../../context/auth-context";

export const useLoggedUser = () => {
	const { user } = useAuth();
	const uid = user.user.uid;
	return useQuery(["users", uid], () => getUser(uid), {
		refetchOnWindowFocus: false,
	});
};

export const useUser = (uid) => {
	const queryClient = useQueryClient();
	return useQuery(["users", uid], () => getUser(uid), {
		initialData: () => {
			return queryClient.getQueryData("users")?.find((u) => u.uid === uid);
		},
	});
};

export const useUsers = () => {
	return useQuery("users", getUsers);
};
