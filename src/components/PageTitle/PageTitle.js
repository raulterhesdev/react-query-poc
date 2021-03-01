import React from "react";

const PageTitle = ({ title }) => {
	return (
		<h1 className='text-2xl bg-yellow-500 text-white text-center p-4'>
			{title}
		</h1>
	);
};

export default PageTitle;
