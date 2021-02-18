import React from "react";
import { useParams } from "react-router";
import { useProject } from "../../hooks/queries/useProject";

const Project = (props) => {
	const params = useParams();
	const { isLoading, data, error } = useProject(params.projectId);
	return (
		<div>
			{isLoading ? (
				<p>Loading...</p>
			) : error ? (
				<p>
					There was an error fetching the project... please refresh the page
				</p>
			) : (
				<div>
					<p>Name: {data.name}</p>
					<p>Description:{data.description}</p>
				</div>
			)}
		</div>
	);
};

export default Project;
