import React, { useState, useEffect } from "react";
import Button from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";
import Input from "../../../components/Input/Input";
import { useCreateProject } from "../../../hooks/mutations/projectMutations";
import { categories } from "../../../utils/constants";
import Textarea from "../../../components/Textarea/Textarea";
import { Select, Option } from "../../../components/Select/Select";

const AddProject = () => {
	const [name, setName] = useState("Project #1");
	const [description, setDescription] = useState("Test");
	const [category, setCategory] = useState("");
	const [modalOpen, setModalOpen] = useState(false);
	const createProjectMutation = useCreateProject();

	const submitProject = () => {
		createProjectMutation.mutate({ name, description, category });
	};

	useEffect(() => {
		//after the mutation finishes wait 200 ms and then close the modal
		if (createProjectMutation.isSuccess)
			setTimeout(() => setModalOpen(false), 200);
	}, [createProjectMutation.isSuccess]);

	return (
		<div className='p-2'>
			<Button
				text='Add Project'
				onClick={() => setModalOpen(true)}
				size='small'
			/>
			<Modal isOpen={modalOpen} closeModal={() => setModalOpen(false)}>
				<h2 className='p-2  text-yellow-900 text-center'>New Project</h2>
				<Input
					label='Name'
					value={name}
					onChange={(e) => setName(e.currentTarget.value)}
				/>
				<Textarea
					label='Description:'
					value={description}
					onChange={(e) => setDescription(e.currentTarget.value)}
					cols={30}
				/>
				<Select
					label='Category'
					value={category}
					onChange={(e) => setCategory(e.target.value)}
				>
					<Option value='' />
					{categories.map((c) => (
						<Option key={c} value={c} text={c} />
					))}
				</Select>
				<div className='my-4 flex justify-center'>
					<Button onClick={submitProject} text='Add Project' />
				</div>
			</Modal>
		</div>
	);
};

export default AddProject;
