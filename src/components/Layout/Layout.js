import React from "react";
import PageTitle from "../PageTitle/PageTitle";

const Layout = ({ pageTitle, children }) => {
	return (
		<div className=' w-full ml-40'>
			<PageTitle title={pageTitle} />
			{children}
		</div>
	);
};

export default Layout;
