import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import {
	useDeleteProject,
	useUpdateProject,
} from "../../hooks/mutations/projectMutations";
import { useProject } from "../../hooks/queries/projectQueries";
import {
	useProjectTasks,
	usePrefetchTask,
} from "../../hooks/queries/taskQueries";
import { useUsers } from "../../hooks/queries/userQueries";

import Layout from "../../components/Layout/Layout";
import Spinner from "../../components/Spinner/Spinner";
import Message from "../../components/Message/Message";
import Textarea from "../../components/Textarea/Textarea";
import { Option, Select } from "../../components/Select/Select";
import Button from "../../components/Button/Button";
import Link from "../../components/Link/Link";

import { categories } from "../../utils/constants";

const ProjectTasks = ({ projectId }) => {
	const { isLoading, data, error } = useProjectTasks(projectId);
	const usersQuery = useUsers();
	const [prefetchTask] = usePrefetchTask();

	const tableStyle = "w-36 py-1 px-2 border-b-2 border-yellow-50";
	const nameStyle = `${tableStyle} w-72 `;
	return (
		<div className='bg-white'>
			<h2 className='text-center text-xl bg-yellow-500 p-3 text-white'>
				Tasks:
			</h2>
			<div className='flex font-bold text-center'>
				<p className={`${tableStyle} w-72`}>Name</p>
				<p className={tableStyle}>Owner</p>
				<p className={tableStyle}>Severity</p>
				<p className={tableStyle}>State</p>
			</div>
			{isLoading ? (
				<Spinner />
			) : error ? (
				<Message type='error'>
					There was an error fetching the project tasks.
				</Message>
			) : (
				data?.map((task) => {
					const userData = usersQuery.data?.find(
						(user) => user.uid === task.userId
					);
					return (
						<div key={task.id} className='flex'>
							<p className={`${nameStyle}`}>
								<Link
									to={`/tasks/${task.id}`}
									onMouseEnter={() => prefetchTask(task.id)}
								>
									{task.name}
								</Link>
							</p>
							<p className={tableStyle}>
								<Link to={`/user/${userData?.uid}`}>{userData?.name}</Link>
							</p>
							<p className={tableStyle}>{task.severity}</p>
							<p className={tableStyle}>{task.state}</p>
						</div>
					);
				})
			)}
		</div>
	);
};

const Project = (props) => {
	const params = useParams();
	const history = useHistory();
	const { isLoading, data, error } = useProject(params.projectId);
	const deleteProjectMutation = useDeleteProject();
	const updateProjectMutation = useUpdateProject();
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");

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
		<Layout pageTitle={data?.name}>
			<div className='px-6 py-4 flex flex-col justify-center items-center'>
				{isLoading ? (
					<Spinner />
				) : error ? (
					<Message type='error'>
						There was an error fetching the project data.
					</Message>
				) : (
					<>
						<Textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							label='Description:'
						/>

						<Select
							label='Category'
							value={category}
							onChange={(e) => setCategory(e.target.value)}
						>
							<Option value='' />
							{categories.map((c) => (
								<Option key={c} value={c} text={c} />
							))}
						</Select>
						<div className='my-4'>
							{updateProjectMutation.isLoading ? (
								<Spinner />
							) : (
								<>
									{updateProjectMutation.isError ? (
										<Message type='error'>
											There was an error updating the project data.
										</Message>
									) : null}
									<Button onClick={submitUpdate} text='Update Project' />
								</>
							)}
						</div>
						<ProjectTasks projectId={data.id} />
						<div className='my-4'>
							{deleteProjectMutation.isLoading ? (
								<Spinner />
							) : (
								<>
									{deleteProjectMutation.isError ? (
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
					</>
				)}
			</div>
		</Layout>
	);
};

export default Project;
