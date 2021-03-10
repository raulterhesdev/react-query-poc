import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import {
	useDeleteTask,
	useUpdateTask,
} from "../../hooks/mutations/taskMutations";
import { useTask } from "../../hooks/queries/taskQueries";
import {
	useLoggedUser,
	useUsers,
	useUser,
} from "../../hooks/queries/userQueries";

import AddComment from "./Components/AddComment";
import Layout from "../../components/Layout/Layout";
import { Select, Option } from "../../components/Select/Select";
import Textarea from "../../components/Textarea/Textarea";
import Button from "../../components/Button/Button";
import QueryWrapper from "../../components/QueryWrapper/QueryWrapper";
import Comment from "./Components/Comment";
import Link from "../../components/Link/Link";

import { severities } from "../../utils/constants";

const PersonData = ({ uid, text }) => {
	const { data } = useUser(uid);
	return (
		<div className='w-full p-2'>
			<p className='text-yellow-900'>{text}</p>
			<p>
				<Link to={`/user/${data?.uid}`}>{data?.name || "..."}</Link>
			</p>
		</div>
	);
};

const Task = () => {
	const params = useParams();
	const history = useHistory();
	const { isLoading, data, error } = useTask(params.taskId);
	const userQuery = useLoggedUser();
	const usersQuery = useUsers();
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
		history.push(`/projects/${data.projectId}`);
	};

	const comments = [];

	if (!isLoading && !error && !usersQuery.isLoading) {
		for (const key in data.comments) {
			if (data.comments.hasOwnProperty(key)) {
				const element = data.comments[key];
				const userData = usersQuery.data?.find(
					(user) => user.uid === element.uid
				);
				comments.push(
					<Comment
						key={element.id}
						userData={userData}
						comment={element}
						taskId={params.taskId}
					/>
				);
			}
		}
	}

	const canUpdateDelete =
		userQuery.data?.uid === data?.creatorUid ||
		userQuery.data?.uid === data?.userId;

	console.log(data);
	return (
		<Layout pageTitle={data?.name}>
			<div className='px-6 py-4 flex flex-col justify-center items-center'>
				<QueryWrapper
					isLoading={isLoading}
					error={error}
					errorText='There was an error getting the task data.'
				>
					{data ? (
						<div className='flex'>
							<div className='flex flex-col items-center mr-8'>
								<PersonData text='Owner' uid={data.userId} />
								<PersonData text='Creator' uid={data.creatorUid} />
								<Textarea
									label='Description:'
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
								<p className='w-full text-yellow-900 px-2 py-1 mt-2'>
									Created at: {data.createdAt}
								</p>
								<p className='w-full text-yellow-900 px-2 py-1'>
									Last Updated: {data.updatedAt}
								</p>
								{canUpdateDelete ? (
									<>
										<div className='my-4'>
											<QueryWrapper
												isLoading={updateTaskMutation.isLoading}
												errorText='There was an error updating the task.'
												error={updateTaskMutation.error}
											>
												<Button onClick={submitUpdate} text='Update Task' />
											</QueryWrapper>
										</div>
										<div className='mb-4'>
											<QueryWrapper
												isLoading={deleteTaskMutation.isLoading}
												errorText='There was an error deleting the task.'
												error={deleteTaskMutation.error}
											>
												<Button
													type='danger'
													text='Delete Task'
													onClick={submitDelete}
												/>
											</QueryWrapper>
										</div>
									</>
								) : null}
							</div>

							<div className='flex flex-col items-center ml-8'>
								<div className='my-4'>
									<AddComment id={data.id} />
								</div>
								<h2 className='p-2  text-yellow-900'>Comments:</h2>
								{comments}
							</div>
						</div>
					) : null}
				</QueryWrapper>
			</div>
		</Layout>
	);
};

export default Task;
