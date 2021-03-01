import React from "react";
import { Link } from "react-router-dom";

const StyledLink = (props) => {
	return (
		<Link {...props} className={`text-yellow-500 underline ${props.className}`}>
			{props.children}
		</Link>
	);
};

export default StyledLink;
