import { useQuery } from "react-query";
import { getUsers } from "../../utils/firebaseAPI";

export const useUsers = () => {
	return useQuery("users", getUsers);
};
