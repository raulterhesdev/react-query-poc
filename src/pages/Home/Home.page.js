import React from "react";
import AddTask from "./components/AddTask";
import AddProject from "./components/AddProject";
import { useLoggedUser } from "../../hooks/queries/userQueries";
import Layout from "../../components/Layout/Layout";

const Home = () => {
	const { data: userData } = useLoggedUser();
	return (
		<Layout pageTitle='Home'>
			<div className='flex justify-center p-4'>
				{userData?.role === "TL" ? <AddProject /> : null}
				<AddTask />
			</div>
		</Layout>
	);
};

export default Home;
