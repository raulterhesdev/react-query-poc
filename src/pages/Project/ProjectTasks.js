import React from "react";

import {
	useProjectTasks,
	usePrefetchTask,
} from "../../hooks/queries/taskQueries";
import { useUsers } from "../../hooks/queries/userQueries";

import Link from "../../components/Link/Link";
import QueryWrapper from "../../components/QueryWrapper/QueryWrapper";
import {
	Table,
	TableHeadRow,
	TableHeadElement,
	TableRow,
	TableRowElement,
} from "../../components/Table/Table";

const ProjectTasks = ({ projectId }) => {
	const { isLoading, data, error } = useProjectTasks(projectId);
	const usersQuery = useUsers();
	const [prefetchTask] = usePrefetchTask();

	return (
		<div className='bg-white'>
			<QueryWrapper
				isLoading={isLoading}
				error={error}
				errorText='There was an error fetching the project data.'
			>
				<Table>
					<TableHeadRow numberOfCols={4}>
						<TableHeadElement>Task</TableHeadElement>
						<TableHeadElement>Owner</TableHeadElement>
						<TableHeadElement>Severity</TableHeadElement>
						<TableHeadElement>State</TableHeadElement>
					</TableHeadRow>
					{data?.map((task) => {
						const userData = usersQuery.data?.find(
							(user) => user.uid === task.userId
						);
						return (
							<TableRow key={task.id} numberOfCols={4}>
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
		</div>
	);
};

export default ProjectTasks;
