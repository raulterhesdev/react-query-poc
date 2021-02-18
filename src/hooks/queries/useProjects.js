import { useQuery } from "react-query";
import { getProjects } from "../../utils/firebaseAPI";

export const useProjects = () => {
	return useQuery("projects", getProjects);
};
