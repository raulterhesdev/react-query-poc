import React from "react";

const Input = ({
	value,
	type,
	onChange,
	label,
	name,
	readOnly,
	placeholder,
}) => {
	return (
		<div className='flex flex-col w-full my-1'>
			<label htmlFor={name || label} className='p-2  text-yellow-900'>
				{label}:
			</label>
			<input
				className={`border-gray-100 border-2 p-2 rounded w-72 ${
					!readOnly ? "focus:border-yellow-300 " : "text-gray-400"
				} outline-none w-full`}
				value={value}
				type={type || "text"}
				onChange={onChange}
				name={name || label}
				readOnly={readOnly}
				placeholder={placeholder}
			/>
		</div>
	);
};

export default Input;
