import React from "react";

const Button = ({ onClick, type, text, size }) => {
	// type prop added in case i need another button type
	const bgColor = type === "danger" ? "bg-red-500" : "bg-yellow-500";
	const bgColorHover = type === "danger" ? "bg-red-600" : "bg-yellow-600";
	const btnSize = size === "small" ? "py-1 px-3" : "py-2 px-8 w-56";
	return (
		<button
			className={` ${btnSize} rounded ${bgColor} hover:${bgColorHover} shadow hover:shadow-none focus:outline-none text-white `}
			onClick={onClick}
		>
			{text}
		</button>
	);
};

export default Button;
