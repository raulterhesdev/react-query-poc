import React, { useEffect, useState } from "react";
import { useLoggedUser } from "../../hooks/queries/userQueries";
import { useUpdateUserData } from "../../hooks/mutations/userMutations";
import Spinner from "../../components/Spinner/Spinner";
import Message from "../../components/Message/Message";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import PageTitle from "../../components/PageTitle/PageTitle";
import Layout from "../../components/Layout/Layout";

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
				{isLoading ? (
					<Spinner />
				) : error ? (
					<Message type='error'>
						There was an error fetching the user data.
					</Message>
				) : (
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
							{updateUserMutation.isLoading ? (
								<Spinner />
							) : (
								<>
									{updateUserMutation.isError ? (
										<Message type='error'>
											There was an error updating the user data.
										</Message>
									) : null}
									<Button text='Update' onClick={submitUpdate} />
								</>
							)}
						</div>
					</>
				)}
			</div>
		</Layout>
	);
};

export default Account;
