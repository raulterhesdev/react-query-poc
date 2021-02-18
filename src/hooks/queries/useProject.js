import { useQuery } from "react-query";
import { getProject } from "../../utils/firebaseAPI";

export const useProject = (projectId) => {
	return useQuery(["project", projectId], () => getProject(projectId));
};
