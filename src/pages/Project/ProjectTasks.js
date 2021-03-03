import React from "react";

import {
	useProjectTasks,
	usePrefetchTask,
} from "../../hooks/queries/taskQueries";
import { useUsers } from "../../hooks/queries/userQueries";

import Spinner from "../../components/Spinner/Spinner";
import Message from "../../components/Message/Message";
import Link from "../../components/Link/Link";

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

export default ProjectTasks;
