import React from "react";
import { useParams } from "react-router-dom";

import { useLoggedUser, useUser } from "../../hooks/queries/userQueries";
import { useTasks, usePrefetchTask } from "../../hooks/queries/taskQueries";
import { useProjects } from "../../hooks/queries/projectQueries";

import Layout from "../../components/Layout/Layout";
import Link from "../../components/Link/Link";
import QueryWrapper from "../../components/QueryWrapper/QueryWrapper";
import {
	Table,
	TableHeadRow,
	TableHeadElement,
	TableRow,
	TableRowElement,
} from "../../components/Table/Table";

const User = () => {
	const params = useParams();
	const userQuery = useUser(params.userId);
	const tasksQuery = useTasks();
	const projectQuery = useProjects();
	const loggedUserQuery = useLoggedUser();
	const [prefetchTask] = usePrefetchTask();

	return (
		<Layout
			pageTitle={
				params.userId === loggedUserQuery.data?.uid
					? "Your Work"
					: userQuery.data?.name || "..."
			}
		>
			<QueryWrapper
				isLoading={tasksQuery.isLoading}
				errorText='There was an error getting the users tasks'
				error={tasksQuery.error}
			>
				<Table>
					<TableHeadRow numberOfCols={4}>
						<TableHeadElement>Project</TableHeadElement>
						<TableHeadElement>Name</TableHeadElement>
						<TableHeadElement>Severity</TableHeadElement>
						<TableHeadElement>State</TableHeadElement>
					</TableHeadRow>
					{tasksQuery.data?.map((task) => {
						const projectData = projectQuery.data?.find(
							(project) => project.id === task.projectId
						);
						if (task.userId === params.userId) {
							return (
								<TableRow numberOfCols={4}>
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
									<TableRowElement>{task.severity}</TableRowElement>
									<TableRowElement>{task.state}</TableRowElement>
								</TableRow>
							);
						}
					})}
				</Table>
			</QueryWrapper>
		</Layout>
	);
};

export default User;
