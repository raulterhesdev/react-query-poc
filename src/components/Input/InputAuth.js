import React from "react";

const Input = ({ value, type, onChange, label, name }) => {
	return (
		<div className='flex flex-col'>
			<label htmlFor={name || label} className='py-1 px-2  text-yellow-900'>
				{label}:
			</label>
			<input
				className='py-2 px-4 mb-6 text-black rounded outline-none border-2 border-transparent focus:border-yellow-300 '
				value={value}
				type={type || "text"}
				onChange={onChange}
				name={name || label}
			/>
		</div>
	);
};

export default Input;
