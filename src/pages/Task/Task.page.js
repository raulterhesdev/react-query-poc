import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDeleteTask } from "../../hooks/mutations/useDeleteTask";
import { useUpdateTask } from "../../hooks/mutations/useUpdateTask";
import { useTask } from "../../hooks/queries/useTask";
import { useUser } from "../../hooks/queries/useUser";
import { severities } from "../../utils/constants";

const Task = () => {
	const params = useParams();
	const history = useHistory();
	const { isLoading, data, error } = useTask(params.taskId);
	const userQuery = useUser();
	const deleteTaskMutation = useDeleteTask();
	const updateTaskMutation = useUpdateTask();
	const [state, setState] = useState("");
	const [severity, setSeverity] = useState("");
	const [description, setDescription] = useState("");

	useEffect(() => {
		setState(data?.state || "");
		setSeverity(data?.severity || "");
		setDescription(data?.description || "");
	}, [data]);

	const submitUpdate = () => {
		updateTaskMutation.mutate({ ...data, state, severity, description });
	};

	const submitDelete = () => {
		deleteTaskMutation.mutate({ projectId: data.projectId, taskId: data.id });
		history.push(`/project/${data.projectId}`);
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
					<h1>Task Name: {data.name}</h1>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<select value={state} onChange={(e) => setState(e.target.value)}>
						<option value='' />
						<option value='Initialized'>Initialized</option>
						<option value='In Progress'>In Progress</option>
						<option value='Closed'>Closed</option>
					</select>
					<select
						value={severity}
						onChange={(e) => setSeverity(e.target.value)}
					>
						<option value='' />
						{severities.map((s) => (
							<option key={s} value={s}>
								{s}
							</option>
						))}
					</select>
					{userQuery.data?.uid === data.creatorUid ||
					userQuery.data?.uid === data.userId ? (
						<div>
							<button onClick={submitUpdate}>Update Task</button>
							<button onClick={submitDelete}>Delete Task</button>
						</div>
					) : (
						<p>You don't have the rights to modify this task</p>
					)}
				</div>
			)}
			<h2>Comments:</h2>
		</div>
	);
};

export default Task;
