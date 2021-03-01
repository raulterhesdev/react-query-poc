import React from "react";

const Button = ({ onClick, type, text, size }) => {
	// type prop added in case i need another button type
	const bgColor = type === "danger" ? "bg-red" : "bg-yellow";
	const btnSize = size === "small" ? "py-1 px-3" : "py-2 px-8 w-56";
	return (
		<button
			className={` ${btnSize} rounded ${bgColor}-500 hover:${bgColor}-600 shadow hover:shadow-none focus:outline-none text-white`}
			onClick={onClick}
		>
			{text}
		</button>
	);
};

export default Button;
