import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
	useDeleteTask,
	useUpdateTask,
	useDeleteComment,
} from "../../hooks/mutations/taskMutations";
import { useTask } from "../../hooks/queries/taskQueries";
import { useLoggedUser, useUsers } from "../../hooks/queries/userQueries";
import { useAuth } from "../../context/auth-context";
import { severities } from "../../utils/constants";
import AddComment from "./Components/AddComment";
import Layout from "../../components/Layout/Layout";
import Spinner from "../../components/Spinner/Spinner";
import Message from "../../components/Message/Message";
import { Select, Option } from "../../components/Select/Select";
import Textarea from "../../components/Textarea/Textarea";
import Button from "../../components/Button/Button";
import Link from "../../components/Link/Link";

const Task = () => {
	const params = useParams();
	const history = useHistory();
	const { isLoading, data, error } = useTask(params.taskId);
	const userQuery = useLoggedUser();
	const usersQuery = useUsers();
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

	if (!isLoading && !error && !usersQuery.isLoading) {
		for (const key in data.comments) {
			if (data.comments.hasOwnProperty(key)) {
				const element = data.comments[key];
				const userData = usersQuery.data?.find(
					(user) => user.uid === element.uid
				);
				console.log(element);
				comments.push(
					<div
						key={element.id}
						className='flex w-96 justify-between items-center rounded shadow px-4 py-2'
					>
						<div>
							<p className='p-1 pb-0'>
								<Link to={`/user/${userData?.uid}`}>{userData?.name}</Link>
							</p>
							<p className='px-1 text-sm text-gray-400'>{element.createdAt}</p>
							<p className='p-1'>{element.text}</p>
						</div>
						{user.user.uid === element.uid ? (
							<Button
								onClick={() => submitDeleteComment(element.id)}
								size='small'
								type='danger'
								text='x'
							/>
						) : null}
					</div>
				);
			}
		}
	}

	const canUpdateDelete =
		userQuery.data?.uid === data?.creatorUid ||
		userQuery.data?.uid === data?.userId;

	return (
		<Layout pageTitle={data?.name || "..."}>
			<div className='px-6 py-4 flex flex-col justify-center items-center'>
				{isLoading ? (
					<Spinner />
				) : error ? (
					<Message type='error'>
						There was an error fetching the project... please refresh the page
					</Message>
				) : (
					<>
						<Textarea
							label='Description'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
						<Select
							value={state}
							onChange={(e) => setState(e.target.value)}
							label='State'
						>
							<Option value='' />
							<Option value='Initialized' text='Initialized' />
							<Option value='In Progress' text='In Progress' />
							<Option value='Closed' text='Closed' />
						</Select>
						<Select
							value={severity}
							onChange={(e) => setSeverity(e.target.value)}
							label='Severity'
						>
							<Option value='' />
							{severities.map((s) => (
								<Option key={s} value={s} text={s} />
							))}
						</Select>
						{canUpdateDelete ? (
							<div className='my-4'>
								{updateTaskMutation.isLoading ? (
									<Spinner />
								) : (
									<>
										{updateTaskMutation.isError ? (
											<Message type='error'>
												There was an error updating the project data.
											</Message>
										) : null}
										<Button onClick={submitUpdate} text='Update Task' />
									</>
								)}
							</div>
						) : null}

						<AddComment id={data.id} />
						<h2 className='p-2  text-yellow-900'>Comments:</h2>
						{comments}
						{canUpdateDelete ? (
							<div className='my-4'>
								{deleteTaskMutation.isLoading ? (
									<Spinner />
								) : (
									<>
										{deleteTaskMutation.isError ? (
											<Message type='error'>
												There was an error deleting the project.
											</Message>
										) : null}
										<Button
											type='danger'
											text='Delete Project'
											onClick={submitDelete}
										/>
									</>
								)}
							</div>
						) : null}
					</>
				)}
			</div>
		</Layout>
	);
};

export default Task;
