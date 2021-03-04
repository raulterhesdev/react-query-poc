import React from "react";

import { useProjects } from "../../hooks/queries/projectQueries";
import { useUser } from "../../hooks/queries/userQueries";
import { usePrefetchProjectTasks } from "../../hooks/queries/taskQueries";

import Link from "../../components/Link/Link";
import Layout from "../../components/Layout/Layout";
import QueryWrapper from "../../components/QueryWrapper/QueryWrapper";
import {
	TableHeadElement,
	TableHeadRow,
	TableRow,
	TableRowElement,
	Table,
} from "../../components/Table/Table";

const Project = ({ project }) => {
	const { id, name, category, ownerUid } = project;
	const userQuery = useUser(ownerUid);
	const [prefetchTasks] = usePrefetchProjectTasks();
	return (
		<TableRow numberOfCols={3}>
			<TableRowElement>
				<Link to={`/projects/${id}`} onMouseEnter={() => prefetchTasks(id)}>
					{name}
				</Link>
			</TableRowElement>
			<TableRowElement>
				{userQuery.isLoading ? (
					"..."
				) : (
					<Link to={`/user/${userQuery.data.uid}`}>{userQuery.data.name}</Link>
				)}
			</TableRowElement>
			<TableRowElement>{category}</TableRowElement>
		</TableRow>
	);
};

const Projects = () => {
	const { data, isLoading, error } = useProjects();
	console.log(data);
	return (
		<Layout pageTitle='All Projects'>
			<QueryWrapper
				isLoading={isLoading}
				errorText='There was an error fetching the projects.'
				error={error}
			>
				<Table>
					<TableHeadRow numberOfCols={3}>
						<TableHeadElement>Name</TableHeadElement>
						<TableHeadElement>Owner</TableHeadElement>
						<TableHeadElement>Category</TableHeadElement>
					</TableHeadRow>
					{data?.map((project) => (
						<Project key={project.id} project={project} />
					))}
				</Table>
			</QueryWrapper>
		</Layout>
	);
};

export default Projects;
