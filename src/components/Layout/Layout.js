import React from "react";
import PageTitle from "../PageTitle/PageTitle";
import { useLoggedUser } from "../../hooks/queries/userQueries";

const Layout = ({ pageTitle, children }) => {
	const { data: userData } = useLoggedUser();
	return (
		<div className=' w-full ml-44'>
			<PageTitle title={pageTitle || "..."} />
			<div className='absolute top-2 right-2 text-white text-xl '>
				<p>Hello, {userData?.name}</p>
			</div>
			{children}
		</div>
	);
};

export default Layout;
