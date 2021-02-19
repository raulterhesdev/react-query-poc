import React, { useState } from "react";
import { useCreateProject } from "../../../hooks/mutations/useCreateProject";

const AddProject = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const createProjectMutation = useCreateProject();

	const submitProject = () => {
		createProjectMutation.mutate({ name, description });
	};
	return (
		<div>
			<input
				value={name}
				onChange={(e) => setName(e.currentTarget.value)}
				placeholder='Project Name'
			/>
			<textarea
				value={description}
				onChange={(e) => setDescription(e.currentTarget.value)}
				placeholder='Description'
				cols={30}
			/>
			<button onClick={submitProject}>Add Project</button>
		</div>
	);
};

export default AddProject;
