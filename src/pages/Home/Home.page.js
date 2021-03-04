import React from "react";

import { useLoggedUser } from "../../hooks/queries/userQueries";

import Layout from "../../components/Layout/Layout";

const Home = () => {
	const { data } = useLoggedUser();
	return (
		<Layout pageTitle='Home'>
			<div className='px-6 py-4 flex flex-col justify-center items-center'>
				<h1 className='text-4xl text-yellow-900 text-bold mt-8'>
					Welcome {data?.name}
				</h1>
			</div>
		</Layout>
	);
};

export default Home;
