import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDeleteProject } from "../../hooks/mutations/useDeleteProject";
import { useUpdateProject } from "../../hooks/mutations/useUpdateProject";
import { useProject } from "../../hooks/queries/useProject";
import { updateProject } from "../../utils/firebaseAPI";

const Project = (props) => {
	const params = useParams();
	const history = useHistory();
	const { isLoading, data, error } = useProject(params.projectId);
	const deleteProjectMutation = useDeleteProject();
	const updateProjectMutation = useUpdateProject();
	const [description, setDescription] = useState("");

	useEffect(() => {
		setDescription(data?.description || "");
	}, [data]);

	const submitDelete = () => {
		deleteProjectMutation.mutate(data.id);
		history.push("/projects");
	};

	const submitUpdate = () => {
		updateProjectMutation.mutate({ ...data, description });
	};

	return (
		<div>
			{isLoading ? (
				<p>Loading...</p>
			) : error ? (
				<p>
					There was an error fetching the project... please refresh the page
				</p>
			) : (
				<div>
					<p>Name: {data.name}</p>
					<p>Description: {data.description}</p>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<p>Number of tasks: {data.numberOfTasks}</p>
					<div>
						<p>Tasks:</p>
					</div>
					<button onClick={submitDelete}>Delete Project</button>
					<button onClick={submitUpdate}>Update Project</button>
				</div>
			)}
		</div>
	);
};

export default Project;
