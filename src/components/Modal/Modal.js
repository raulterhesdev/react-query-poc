import React, { useState } from "react";

const Modal = ({ children, isOpen, closeModal }) => {
	return (
		<div
			className={`p-4 shadow rounded  fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale  opacity-${
				isOpen ? "100" : "0"
			} scale-${
				isOpen ? "100" : "0"
			} z-50 bg-white ml-24 h-5/6 overflow-auto w-7/12 flex flex-col items-center`}
		>
			<span
				className='absolute top-2 right-4 text-yellow-900 hover:text-yellow-500 cursor-pointer'
				onClick={closeModal}
			>
				x
			</span>
			{children}
		</div>
	);
};

export default Modal;
