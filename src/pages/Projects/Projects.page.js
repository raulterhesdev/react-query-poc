import React from "react";
import { useProjects } from "../../hooks/queries/useProjects";
import { Link } from "react-router-dom";

const Project = () => {
	const { data, isLoading, error } = useProjects();

	return (
		<div>
			{isLoading ? (
				<p>Loading...</p>
			) : error ? (
				<p>
					There was an error fetching the projects... please refresh the page
				</p>
			) : (
				<div>
					{data.map((project) => (
						<div key={project.id}>
							<p>Name: {project.name}</p>
							<p>Description:{project.description}</p>
							<Link to={`/project/${project.id}`}>Go To</Link>
							<hr />
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Project;
