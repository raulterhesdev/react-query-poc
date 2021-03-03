import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import {
	useDeleteProject,
	useUpdateProject,
} from "../../hooks/mutations/projectMutations";
import { useProject } from "../../hooks/queries/projectQueries";

import Layout from "../../components/Layout/Layout";
import Spinner from "../../components/Spinner/Spinner";
import Message from "../../components/Message/Message";
import Textarea from "../../components/Textarea/Textarea";
import { Option, Select } from "../../components/Select/Select";
import Button from "../../components/Button/Button";
import ProjectTasks from "./ProjectTasks";

import { categories } from "../../utils/constants";

const Project = (props) => {
	const params = useParams();
	const history = useHistory();
	const { isLoading, data, error } = useProject(params.projectId);
	const deleteProjectMutation = useDeleteProject();
	const updateProjectMutation = useUpdateProject();
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");

	useEffect(() => {
		setDescription(data?.description || "");
		setCategory(data?.category || "");
	}, [data]);

	const submitDelete = () => {
		deleteProjectMutation.mutate(data.id);
		history.push("/projects");
	};

	const submitUpdate = () => {
		updateProjectMutation.mutate({ ...data, description, category });
	};

	return (
		<Layout pageTitle={data?.name}>
			<div className='px-6 py-4 flex flex-col justify-center items-center'>
				{isLoading ? (
					<Spinner />
				) : error ? (
					<Message type='error'>
						There was an error fetching the project data.
					</Message>
				) : (
					<>
						<Textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							label='Description:'
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
						<div className='my-4'>
							{updateProjectMutation.isLoading ? (
								<Spinner />
							) : (
								<>
									{updateProjectMutation.isError ? (
										<Message type='error'>
											There was an error updating the project data.
										</Message>
									) : null}
									<Button onClick={submitUpdate} text='Update Project' />
								</>
							)}
						</div>
						<ProjectTasks projectId={data.id} />
						<div className='my-4'>
							{deleteProjectMutation.isLoading ? (
								<Spinner />
							) : (
								<>
									{deleteProjectMutation.isError ? (
										<Message type='error'>
											There was an error deleting the project.
										</Message>
									) : null}
									<Button
										type='danger'
										text='Delete Project'
										onClick={submitDelete}
									/>
								</>
							)}
						</div>
					</>
				)}
			</div>
		</Layout>
	);
};

export default Project;
