import React from "react";

import { useTasks, usePrefetchTask } from "../../hooks/queries/taskQueries";
import { useUsers } from "../../hooks/queries/userQueries";
import { useProjects } from "../../hooks/queries/projectQueries";

import Link from "../../components/Link/Link";
import QueryWrapper from "../../components/QueryWrapper/QueryWrapper";
import Layout from "../../components/Layout/Layout";
import {
	Table,
	TableHeadRow,
	TableHeadElement,
	TableRow,
	TableRowElement,
} from "../../components/Table/Table";

const Tasks = () => {
	const { isLoading, data, error } = useTasks();
	const usersQuery = useUsers();
	const projectQuery = useProjects();
	const [prefetchTask] = usePrefetchTask();

	return (
		<Layout pageTitle='Tasks'>
			<QueryWrapper
				isLoading={isLoading}
				errorText='There was an error getting the tasks'
				error={error}
			>
				<Table>
					<TableHeadRow numberOfCols={5}>
						<TableHeadElement>Project</TableHeadElement>
						<TableHeadElement>Name</TableHeadElement>
						<TableHeadElement>Owner</TableHeadElement>
						<TableHeadElement>Severity</TableHeadElement>
						<TableHeadElement>State</TableHeadElement>
					</TableHeadRow>
					{data?.map((task) => {
						const userData = usersQuery.data?.find(
							(user) => user.uid === task.userId
						);
						const projectData = projectQuery.data?.find(
							(project) => project.id === task.projectId
						);
						return (
							<TableRow key={task.id} numberOfCols={5}>
								<TableRowElement>
									<Link to={`/projects/${projectData?.id}`}>
										{projectData?.name}
									</Link>
								</TableRowElement>
								<TableRowElement>
									<Link
										to={`/tasks/${task.id}`}
										onMouseEnter={() => prefetchTask(task.id)}
									>
										{task.name}
									</Link>
								</TableRowElement>
								<TableRowElement>
									<Link to={`/user/${userData?.uid}`}>{userData?.name}</Link>
								</TableRowElement>
								<TableRowElement>{task.severity}</TableRowElement>
								<TableRowElement>{task.state}</TableRowElement>
							</TableRow>
						);
					})}
				</Table>
			</QueryWrapper>
		</Layout>
	);
};

export default Tasks;
