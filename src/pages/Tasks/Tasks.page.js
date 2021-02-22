import React from "react";
import { useTasks } from "../../hooks/queries/useTasks";
import { Link } from "react-router-dom";

const Tasks = () => {
	const { isLoading, data, error } = useTasks();
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
					{data.map((task) => (
						<div key={task.id}>
							<span>{task.name}</span>
							<Link to={`/tasks/${task.id}`}>Go To</Link>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Tasks;
