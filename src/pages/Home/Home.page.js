import React from "react";
import AddTask from "./components/AddTask";
import AddProject from "./components/AddProject";
import { useUser } from "../../hooks/queries/useUser";

const Home = () => {
	const { data: userData } = useUser();
	return (
		<div>
			{userData?.role === "TL" ? <AddProject /> : null}

			<AddTask />
		</div>
	);
};

export default Home;
