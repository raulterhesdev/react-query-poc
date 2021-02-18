import { useQuery } from "react-query";
import { getUser } from "../../utils/firebaseAPI";

export const useUser = (uid) => {
	return useQuery(["users", uid], () => getUser(uid));
};
