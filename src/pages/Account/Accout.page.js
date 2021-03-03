import React, { useEffect, useState } from "react";

import { useLoggedUser } from "../../hooks/queries/userQueries";
import { useUpdateUserData } from "../../hooks/mutations/userMutations";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Layout from "../../components/Layout/Layout";
import QueryWrapper from "../../components/QueryWrapper/QueryWrapper";

const Account = () => {
	const { isLoading, error, data } = useLoggedUser();
	const updateUserMutation = useUpdateUserData();
	const [name, setName] = useState("");
	const [age, setAge] = useState("25");

	const submitUpdate = () => {
		updateUserMutation.mutate({ ...data, name, age });
	};

	useEffect(() => {
		setName(data?.name || "");
		setAge(data?.age || "28");
	}, [data]);

	return (
		<Layout pageTitle='Your Account'>
			<div className='flex flex-col justify-center items-center w-full mt-12'>
				<QueryWrapper
					isLoading={isLoading}
					error={error}
					errorText='There was an error fetching the user data.'
				>
					{data ? (
						<>
							<Input value={data.email} readOnly label='Email' />
							<Input value={data.role} readOnly label='Role' />
							<Input
								label='Name'
								value={name}
								onChange={(e) => setName(e.currentTarget.value)}
								placeholder='name'
							/>
							<Input
								label='Age'
								type='number'
								value={age}
								onChange={(e) => setAge(e.currentTarget.value)}
							/>
							<div className='mt-6'>
								<QueryWrapper
									isLoading={updateUserMutation.isLoading}
									error={updateUserMutation.error}
									errorText='There was an error updating the user data.'
								>
									<Button text='Update' onClick={submitUpdate} />
								</QueryWrapper>
							</div>
						</>
					) : null}
				</QueryWrapper>
			</div>
		</Layout>
	);
};

export default Account;
