import React from "react";

const Message = ({ text, type }) => {
	const defaultClasses =
		"text-center text-sm p-2 border-2 rounded absolute right-4 bottom-4 w-64";

	const errorClasses = "text-red-600 border-red-600  bg-red-200";

	const successClasses = "text-green-600 border-green-600 bg-green-200";

	const classes = `${defaultClasses} ${
		type === "error" ? errorClasses : successClasses
	}`;

	return <p className={classes}>{text}</p>;
};

export default Message;
