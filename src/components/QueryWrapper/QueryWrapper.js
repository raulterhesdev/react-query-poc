import React from "react";
import Spinner from "../Spinner/Spinner";
import Message from "../Message/Message";

const QueryWrapper = ({ isLoading, error, errorText, children }) => {
	return (
		<>
			{isLoading ? (
				<div className='flex justify-center'>
					<Spinner />
				</div>
			) : error ? (
				<Message type='error'>{errorText}</Message>
			) : (
				children
			)}
		</>
	);
};

export default QueryWrapper;
