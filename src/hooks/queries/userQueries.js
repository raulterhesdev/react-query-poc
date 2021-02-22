import { useQuery } from "react-query";
import { getUser, getUsers } from "../../utils/firebaseAPI";
import { useAuth } from "../../context/auth-context";

export const useUser = () => {
	const { user } = useAuth();
	const uid = user.user.uid;
	return useQuery(["users", uid], () => getUser(uid), {
		refetchOnWindowFocus: false,
	});
};

export const useUsers = () => {
	return useQuery("users", getUsers);
};
