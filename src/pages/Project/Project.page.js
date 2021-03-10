import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import {
	useDeleteProject,
	useUpdateProject,
} from "../../hooks/mutations/projectMutations";
import { useProject } from "../../hooks/queries/projectQueries";

import Layout from "../../components/Layout/Layout";
import Textarea from "../../components/Textarea/Textarea";
import { Option, Select } from "../../components/Select/Select";
import Button from "../../components/Button/Button";
import ProjectTasks from "./ProjectTasks";
import QueryWrapper from "../../components/QueryWrapper/QueryWrapper";
import Link from "../../components/Link/Link";

import { categories } from "../../utils/constants";
import { useUser, useLoggedUser } from "../../hooks/queries/userQueries";

const Owner = ({ ownerId }) => {
	const { data } = useUser(ownerId);
	return (
		<div className='w-full p-2'>
			<p className='text-yellow-900'>Owner:</p>
			<p>
				<Link to={`/user/${data?.uid}`}>{data?.name || "..."}</Link>
			</p>
		</div>
	);
};

const Project = () => {
	const params = useParams();
	const history = useHistory();
	const { isLoading, data, error } = useProject(params.projectId);
	const deleteProjectMutation = useDeleteProject();
	const updateProjectMutation = useUpdateProject();
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const loggedUser = useLoggedUser();

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

	const canUpdateDelete = loggedUser.data?.uid === data?.ownerUid;

	return (
		<Layout pageTitle={data?.name}>
			<div className='px-6 py-4 flex flex-col justify-center items-center'>
				<QueryWrapper
					isLoading={isLoading}
					error={error}
					errorText='There was an error fetching the project data.'
				>
					{data ? (
						<div className='flex'>
							<div className='flex flex-col items-center mr-8'>
								<Owner ownerId={data.ownerUid} />
								<Textarea
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									label='Description:'
									disabled={!canUpdateDelete}
								/>

								<Select
									label='Category'
									value={category}
									onChange={(e) => setCategory(e.target.value)}
									disabled={!canUpdateDelete}
								>
									<Option value='' />
									{categories.map((c) => (
										<Option key={c} value={c} text={c} />
									))}
								</Select>
								<p className='w-full text-yellow-900 px-2 py-1 mt-2'>
									Created at: {data.createdAt}
								</p>
								<p className='w-full text-yellow-900 px-2 py-1'>
									Last Updated: {data.updatedAt}
								</p>
								{canUpdateDelete ? (
									<>
										<div className='my-4'>
											<QueryWrapper
												isLoading={updateProjectMutation.isLoading}
												error={updateProjectMutation.error}
												errorText='There was an error updating the project data.'
											>
												<Button onClick={submitUpdate} text='Update Project' />
											</QueryWrapper>
										</div>
										<div className='mb-4'>
											<QueryWrapper
												isLoading={deleteProjectMutation.isLoading}
												error={deleteProjectMutation.error}
												errorText='There was an error deleting the project.'
											>
												<Button
													type='danger'
													text='Delete Project'
													onClick={submitDelete}
												/>
											</QueryWrapper>
										</div>
									</>
								) : null}
							</div>
							<ProjectTasks projectId={data.id} />
						</div>
					) : null}
				</QueryWrapper>
			</div>
		</Layout>
	);
};

export default Project;
