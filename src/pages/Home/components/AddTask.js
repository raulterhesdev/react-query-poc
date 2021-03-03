import React, { useEffect, useState } from "react";

import { useCreateTask } from "../../../hooks/mutations/taskMutations";
import { useProjects } from "../../../hooks/queries/projectQueries";
import { useUsers } from "../../../hooks/queries/userQueries";

import Input from "../../../components/Input/Input";
import { Select, Option } from "../../../components/Select/Select";
import Button from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";
import Textarea from "../../../components/Textarea/Textarea";

import { severities } from "../../../utils/constants";
import QueryWrapper from "../../../components/QueryWrapper/QueryWrapper";

const AddTask = () => {
	const projectQuery = useProjects();
	const usersQuery = useUsers();
	const addTaskMutation = useCreateTask();

	const [name, setName] = useState("Test");
	const [description, setDescription] = useState("Test");
	const [project, setProject] = useState("");
	const [user, setUser] = useState("");
	const [severity, setSeverity] = useState("");
	const [modalOpen, setModalOpen] = useState(false);

	const submitTask = () => {
		addTaskMutation.mutate({
			name,
			description,
			projectId: project,
			userId: user,
			severity,
		});
	};

	useEffect(() => {
		//after the mutation finishes wait 200 ms and then close the modal
		if (addTaskMutation.isSuccess) setTimeout(() => setModalOpen(false), 200);
	}, [addTaskMutation.isSuccess]);

	return (
		<div className='p-2'>
			<Button text='Add Task' onClick={() => setModalOpen(true)} size='small' />
			<Modal isOpen={modalOpen} closeModal={() => setModalOpen(false)}>
				<h2 className='p-2  text-yellow-900 text-center'>New Task</h2>
				<Input
					label='Name'
					value={name}
					onChange={(e) => setName(e.currentTarget.value)}
				/>
				<Textarea
					label='Description'
					value={description}
					onChange={(e) => setDescription(e.currentTarget.value)}
					cols={30}
				/>
				<QueryWrapper
					isLoading={projectQuery.isLoading}
					error={projectQuery.error}
					errorText='There was an error getting the projects.'
				>
					{projectQuery.data ? (
						<Select
							label='Project'
							value={project}
							onChange={(e) => setProject(e.target.value)}
						>
							<Option value='' />
							{projectQuery.data.map((project) => (
								<Option
									key={project.id}
									value={project.id}
									text={project.name}
								/>
							))}
						</Select>
					) : null}
				</QueryWrapper>
				<QueryWrapper
					isLoading={usersQuery.isLoading}
					error={usersQuery.error}
					errorText='There was an error getting the users.'
				>
					{usersQuery.data ? (
						<Select
							label='Owner'
							value={user}
							onChange={(e) => setUser(e.target.value)}
						>
							<Option value='' />
							{usersQuery.data.map((project) => (
								<Option
									key={project.uid}
									value={project.uid}
									text={project.name}
								/>
							))}
						</Select>
					) : null}
				</QueryWrapper>
				<Select
					label='Severity'
					value={severity}
					onChange={(e) => setSeverity(e.target.value)}
				>
					<Option value='' />
					{severities.map((s) => (
						<Option key={s} value={s} text={s} />
					))}
				</Select>
				<div className='my-4 flex justify-center'>
					<QueryWrapper
						isLoading={addTaskMutation.isLoading}
						error={addTaskMutation.error}
						errorText='There was an error adding the task.'
					>
						<Button onClick={submitTask} text='Add Task' />
					</QueryWrapper>
				</div>
			</Modal>
		</div>
	);
};

export default AddTask;
