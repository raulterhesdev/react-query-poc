import React from "react";
import { useProjects } from "../../hooks/queries/projectQueries";
import { useUser } from "../../hooks/queries/userQueries";
import { usePrefetchProjectTasks } from "../../hooks/queries/taskQueries";
import Link from "../../components/Link/Link";
import Layout from "../../components/Layout/Layout";
import Spinner from "../../components/Spinner/Spinner";
import Message from "../../components/Message/Message";

const ProjectCard = ({ project }) => {
	const { id, name, category, ownerUid } = project;
	const userQuery = useUser(ownerUid);
	const [prefetchTasks] = usePrefetchProjectTasks();
	return (
		<div
			key={id}
			className='flex flex-col  text-center shadow  m-3 rounded overflow-hidden w-56 bg-white'
		>
			<p className='bg-yellow-500 text-white py-2 px-4'>{name}</p>
			<p className=' py-1 px-4'>{category}</p>
			<p className=' text-yellow-600'>
				{userQuery.isLoading ? (
					"..."
				) : (
					<Link to={`/user/${userQuery.data.uid}`}>{userQuery.data.name}</Link>
				)}
			</p>
			<Link
				to={`/projects/${id}`}
				className='text-right py-2 px-4'
				onMouseEnter={() => {
					prefetchTasks(id);
				}}
			>
				More
			</Link>
		</div>
	);
};

const Projects = () => {
	const { data, isLoading, error } = useProjects();

	return (
		<Layout pageTitle='All Projects'>
			<div className='px-6 py-4 flex flex-wrap'>
				{isLoading ? (
					<Spinner />
				) : error ? (
					<Message type='error'>
						There was an error fetching the projects... please refresh the page
					</Message>
				) : (
					<>
						{data.map((project) => (
							<ProjectCard key={project.id} project={project} />
						))}
					</>
				)}
			</div>
		</Layout>
	);
};

export default Projects;
