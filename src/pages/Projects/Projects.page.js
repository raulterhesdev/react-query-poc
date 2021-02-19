import React from "react";
import AddProject from "./components/AddProject";
import { useProjects } from "../../hooks/queries/useProjects";
import { useUser } from "../../hooks/queries/useUser";
import { Link } from "react-router-dom";
import AddTask from "./components/AddTask";

const Project = () => {
	const { data, isLoading, error } = useProjects();
	const { data: userData } = useUser();

	return (
		<div>
			{userData?.role === "TL" ? <AddProject /> : null}

			<AddTask />

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
