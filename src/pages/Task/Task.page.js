import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDeleteTask } from "../../hooks/mutations/useDeleteTask";
import { useUpdateTask } from "../../hooks/mutations/useUpdateTask";
import { useTask } from "../../hooks/queries/useTask";
import { useUser } from "../../hooks/queries/useUser";

const Task = () => {
	const params = useParams();
	const history = useHistory();
	const { isLoading, data, error } = useTask(params.taskId);
	const userQuery = useUser();
	const deleteTaskMutation = useDeleteTask();
	const updateTaskMutation = useUpdateTask();
	const [state, setState] = useState("");

	// console.log(data, userQuery.data);

	useEffect(() => {
		setState(data?.state || "");
	}, [data]);

	const submitUpdate = () => {
		updateTaskMutation.mutate({ ...data, state });
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
					<p>{data.description}</p>
					<select value={state} onChange={(e) => setState(e.target.value)}>
						<option value='' />
						<option value='Initialized'>Initialized</option>
						<option value='In Progress'>In Progress</option>
						<option value='Closed'>Closed</option>
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
