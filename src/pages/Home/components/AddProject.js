import React, { useState } from "react";
import { useCreateProject } from "../../../hooks/mutations/useCreateProject";
import { categories } from "../../../utils/constants";

const AddProject = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const createProjectMutation = useCreateProject();

	const submitProject = () => {
		createProjectMutation.mutate({ name, description, category });
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
			<select value={category} onChange={(e) => setCategory(e.target.value)}>
				<option value='' />
				{categories.map((c) => (
					<option key={c} value={c}>
						{c}
					</option>
				))}
			</select>
			<button onClick={submitProject}>Add Project</button>
		</div>
	);
};

export default AddProject;
