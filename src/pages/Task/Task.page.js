import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
	useDeleteTask,
	useUpdateTask,
	useDeleteComment,
} from "../../hooks/mutations/taskMutations";
import { useTask } from "../../hooks/queries/taskQueries";
import { useUser } from "../../hooks/queries/userQueries";
import { useAuth } from "../../context/auth-context";
import { severities } from "../../utils/constants";
import AddComment from "./Components/AddComment";

const Task = () => {
	const params = useParams();
	const history = useHistory();
	const { isLoading, data, error } = useTask(params.taskId);
	const userQuery = useUser();
	const deleteTaskMutation = useDeleteTask();
	const updateTaskMutation = useUpdateTask();
	const deleteCommentMutation = useDeleteComment();
	const { user } = useAuth();
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

	const submitDeleteComment = (commentId) => {
		deleteCommentMutation.mutate({ commentId, taskId: params.taskId });
	};

	const comments = [];

	if (!isLoading && !error) {
		for (const key in data.comments) {
			if (data.comments.hasOwnProperty(key)) {
				const element = data.comments[key];
				comments.push(
					<div key={element.id}>
						<p>{element.text}</p>
						{user.user.uid === element.uid ? (
							<button onClick={() => submitDeleteComment(element.id)}>
								Delete
							</button>
						) : null}
					</div>
				);
			}
		}
	}

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
					<h2>Comments:</h2>
					<AddComment id={data.id} />
					{comments}
				</div>
			)}
		</div>
	);
};

export default Task;
