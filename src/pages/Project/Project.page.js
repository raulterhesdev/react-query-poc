import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDeleteProject } from "../../hooks/mutations/useDeleteProject";
import { useUpdateProject } from "../../hooks/mutations/useUpdateProject";
import { useProject } from "../../hooks/queries/useProject";
import { useProjectTasks } from "../../hooks/queries/useProjectTasks";

const Project = (props) => {
	const params = useParams();
	const history = useHistory();
	const { isLoading, data, error } = useProject(params.projectId);
	const deleteProjectMutation = useDeleteProject();
	const updateProjectMutation = useUpdateProject();
	const [description, setDescription] = useState("");
	const projectTasksQuery = useProjectTasks(params.projectId);

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

	console.log(projectTasksQuery.data);

	return (
		<div>
			<h1>Project:</h1>
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
					<button onClick={submitDelete}>Delete Project</button>
					<button onClick={submitUpdate}>Update Project</button>
					<div>
						<h2>Tasks:</h2>
						{isLoading ? (
							<p>Loading...</p>
						) : error ? (
							<p>
								There was an error fetching the project... please refresh the
								page
							</p>
						) : (
							projectTasksQuery.data.map((task) => (
								<div>
									<p>{task.name}</p>
									<Link to={`/tasks/${task.id}`}>Go To</Link>
								</div>
							))
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default Project;
