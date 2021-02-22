import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import {
	useDeleteProject,
	useUpdateProject,
} from "../../hooks/mutations/projectMutations";
import { useProject } from "../../hooks/queries/projectQueries";
import { useProjectTasks } from "../../hooks/queries/taskQueries";
import { categories } from "../../utils/constants";

const Project = (props) => {
	const params = useParams();
	const history = useHistory();
	const { isLoading, data, error } = useProject(params.projectId);
	const deleteProjectMutation = useDeleteProject();
	const updateProjectMutation = useUpdateProject();
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const projectTasksQuery = useProjectTasks(params.projectId);

	useEffect(() => {
		setDescription(data?.description || "");
		setCategory(data?.category || "");
	}, [data]);

	const submitDelete = () => {
		deleteProjectMutation.mutate(data.id);
		history.push("/projects");
	};

	const submitUpdate = () => {
		updateProjectMutation.mutate({ ...data, description, category });
	};

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
					<select
						value={category}
						onChange={(e) => setCategory(e.target.value)}
					>
						<option value='' />
						{categories.map((c) => (
							<option key={c} value={c}>
								{c}
							</option>
						))}
					</select>
					<button onClick={submitDelete}>Delete Project</button>
					<button onClick={submitUpdate}>Update Project</button>
					<div>
						<h2>Tasks:</h2>
						{projectTasksQuery.isLoading ? (
							<p>Loading...</p>
						) : projectTasksQuery.error ? (
							<p>
								There was an error fetching the project... please refresh the
								page
							</p>
						) : (
							projectTasksQuery.data?.map((task) => (
								<div key={task.id}>
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
