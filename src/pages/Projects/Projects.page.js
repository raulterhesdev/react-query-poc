import React from "react";
import AddProject from "./components/AddProject";
import { useProjects } from "../../hooks/queries/useProjects";

const Project = () => {
	const { data, isLoading, error } = useProjects();
	return (
		<div>
			<AddProject />
			{isLoading ? (
				<p>Loading...</p>
			) : error ? (
				<p>
					There was an error fetching the projects... please refresh the page
				</p>
			) : (
				<div>
					{data.map((project) => (
						<div>
							<p>Name: {project.name}</p>
							<p>Description:{project.description}</p>
							<hr />
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Project;
