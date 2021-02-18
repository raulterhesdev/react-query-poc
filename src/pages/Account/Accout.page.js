import React, { useEffect, useState } from "react";
import { useUser } from "../../hooks/queries/useUser";
import { useUpdateUserData } from "../../hooks/mutations/useUpdateUserData";

const Account = () => {
	const { isLoading, error, data } = useUser();
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
		<div>
			{isLoading ? (
				<p>Loading...</p>
			) : error ? (
				<p>Error..</p>
			) : (
				<div>
					<p>{data.email}</p>
					<p>{data.role}</p>
					<input
						value={name}
						onChange={(e) => setName(e.currentTarget.value)}
						placeholder='name'
					/>
					<input
						type='number'
						value={age}
						onChange={(e) => setAge(e.currentTarget.value)}
					/>
					{updateUserMutation.isLoading ? (
						<p>Updating...</p>
					) : (
						<>
							{updateUserMutation.isError ? (
								<p>There was an error updating the user...</p>
							) : null}
							<button onClick={submitUpdate}>Update</button>
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default Account;
