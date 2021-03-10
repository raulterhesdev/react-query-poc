import React from "react";

export const Select = ({ children, value, onChange, label, disabled }) => {
	return (
		<div className='flex justify-center flex-col w-full my-1'>
			<label className='p-2  text-yellow-900'>{label}:</label>
			<select
				value={value}
				onChange={onChange}
				className={`border-gray-100 border-2 p-2 rounded w-56 ${
					!disabled ? "focus:border-yellow-300" : null
				}  outline-none w-full`}
				disabled={disabled}
			>
				{children}
			</select>
		</div>
	);
};

export const Option = ({ value, text }) => {
	return (
		<option value={value} className='hover:bg-yellow-500 hover:text-white'>
			{text}
		</option>
	);
};
