import React from "react";

const Textarea = ({ value, onChange, label, name, placeholder, disabled }) => {
	return (
		<div className='flex justify-center flex-col  my-1'>
			{label ? (
				<label htmlFor={name || label} className='p-2  text-yellow-900'>
					{label}
				</label>
			) : null}
			<textarea
				className={`border-gray-100 border-2 p-2 rounded w-96 h-52 ${
					!disabled ? "focus:border-yellow-300" : null
				}  outline-none`}
				value={value}
				onChange={onChange}
				name={name || label}
				placeholder={placeholder}
				disabled={disabled}
			/>
		</div>
	);
};

export default Textarea;
