import React from "react";

import { useTasks, usePrefetchTask } from "../../hooks/queries/taskQueries";
import { useUsers } from "../../hooks/queries/userQueries";
import { useProjects } from "../../hooks/queries/projectQueries";

import Link from "../../components/Link/Link";
import Spinner from "../../components/Spinner/Spinner";
import Message from "../../components/Message/Message";
import Layout from "../../components/Layout/Layout";

const Tasks = () => {
	const { isLoading, data, error } = useTasks();
	const usersQuery = useUsers();
	const projectQuery = useProjects();
	const [prefetchTask] = usePrefetchTask();

	const tableStyle =
		"w-36 py-1 px-2 border-b-2 border-yellow-50 overflow-ellipsis";
	const extentedStyle = `${tableStyle} w-72 `;
	return (
		<Layout pageTitle='Tasks'>
			<div className='flex flex-col items-center m-6 bg-white p-4 shadow rounded '>
				<div className='flex font-bold text-center '>
					<p className={`${tableStyle} w-72`}>Project</p>
					<p className={`${tableStyle} w-72`}>Name</p>
					<p className={tableStyle}>Owner</p>
					<p className={tableStyle}>Severity</p>
					<p className={tableStyle}>State</p>
				</div>
				{isLoading ? (
					<Spinner />
				) : error ? (
					<Message type='error'>
						There was an error fetching the project data.
					</Message>
				) : (
					<div>
						{data.map((task) => {
							const userData = usersQuery.data?.find(
								(user) => user.uid === task.userId
							);
							const projectData = projectQuery.data?.find(
								(project) => project.id === task.projectId
							);
							return (
								<div key={task.id} className='flex'>
									<p className={`${extentedStyle}`}>
										<Link to={`/projects/${projectData?.id}`}>
											{projectData?.name}
										</Link>
									</p>
									<p className={`${extentedStyle}`}>
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
						})}
					</div>
				)}
			</div>
		</Layout>
	);
};

export default Tasks;
