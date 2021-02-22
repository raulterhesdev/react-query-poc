import React, { useState } from "react";
import { useCreateTask } from "../../../hooks/mutations/useCreateTask";
import { useProjects } from "../../../hooks/queries/useProjects";
import { useUsers } from "../../../hooks/queries/useUsers";
import { severities } from "../../../utils/constants";

const AddTask = () => {
	const projectQuery = useProjects();
	const usersQuery = useUsers();
	const addTaskMutation = useCreateTask();

	const [name, setName] = useState("Test");
	const [description, setDescription] = useState("Test");
	const [project, setProject] = useState("");
	const [user, setUser] = useState("");
	const [severity, setSeverity] = useState("");

	const submitTask = () => {
		addTaskMutation.mutate({
			name,
			description,
			projectId: project,
			userId: user,
			severity,
		});
	};

	return (
		<div>
			<input
				placeholder='name'
				value={name}
				onChange={(e) => setName(e.currentTarget.value)}
			/>
			<input
				placeholder='description'
				value={description}
				onChange={(e) => setDescription(e.currentTarget.value)}
			/>

			{projectQuery.isLoading ? (
				<p>Loading...</p>
			) : projectQuery.error ? (
				<p>There was an error...</p>
			) : (
				<select value={project} onChange={(e) => setProject(e.target.value)}>
					<option value='' />
					{projectQuery.data.map((project) => (
						<option key={project.id} value={project.id}>
							{project.name}
						</option>
					))}
				</select>
			)}

			{usersQuery.isLoading ? (
				<p>Loading...</p>
			) : usersQuery.error ? (
				<p>There was an error...</p>
			) : (
				<select value={user} onChange={(e) => setUser(e.target.value)}>
					<option value='' />
					{usersQuery.data.map((project) => (
						<option key={project.uid} value={project.uid}>
							{project.name}
						</option>
					))}
				</select>
			)}

			<select value={severity} onChange={(e) => setSeverity(e.target.value)}>
				<option value='' />
				{severities.map((s) => (
					<option key={s} value={s}>
						{s}
					</option>
				))}
			</select>
			<button onClick={submitTask}>Add Task</button>
		</div>
	);
};

export default AddTask;
