import { useQuery } from "react-query";
import { getUser } from "../../utils/firebaseAPI";
import { useAuth } from "../../context/auth-context";

export const useUser = () => {
	const { user } = useAuth();
	const uid = user.user.uid;
	return useQuery(["users", uid], () => getUser(uid));
};
