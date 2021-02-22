import { useQuery } from "react-query";
import { getTasks } from "../../utils/firebaseAPI";

export const useTasks = () => {
	return useQuery("tasks", getTasks);
};
