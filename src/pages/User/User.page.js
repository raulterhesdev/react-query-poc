import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { useLoggedUser, useUser } from "../../hooks/queries/userQueries";
import { useTasks, usePrefetchTask } from "../../hooks/queries/taskQueries";
import Spinner from "../../components/Spinner/Spinner";
import Message from "../../components/Message/Message";
import Link from "../../components/Link/Link";
import { useProjects } from "../../hooks/queries/projectQueries";

const User = () => {
	const params = useParams();
	const userQuery = useUser(params.userId);
	const tasksQuery = useTasks();
	const projectQuery = useProjects();
	const loggedUserQuery = useLoggedUser();
	const [prefetchTask] = usePrefetchTask();

	const tableStyle =
		"w-36 py-1 px-2 border-b-2 border-yellow-50 overflow-ellipsis";
	const extentedStyle = `${tableStyle} w-72 `;
	return (
		<Layout
			pageTitle={
				params.userId === loggedUserQuery.data?.uid
					? "Your Work"
					: userQuery.data?.name || "..."
			}
		>
			<div className='flex flex-col justify-center items-center w-full mt-12'>
				<div className='flex font-bold text-center '>
					<p className={`${tableStyle} w-72`}>Project</p>
					<p className={`${tableStyle} w-72`}>Name</p>
					<p className={tableStyle}>Severity</p>
					<p className={tableStyle}>State</p>
				</div>
				{tasksQuery.isLoading ? (
					<Spinner />
				) : tasksQuery.error ? (
					<Message type='error'>
						There was an error fetching the tasks data.
					</Message>
				) : (
					<div>
						{tasksQuery.data.map((task) => {
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

export default User;
