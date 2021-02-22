import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
	return (
		<div>
			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
				<li>
					<Link to='/account'>Account</Link>
				</li>
				<li>
					<Link to='/projects'>Projects</Link>
				</li>
				<li>
					<Link to='tasks'>Tasks</Link>
				</li>
			</ul>
		</div>
	);
};

export default Navigation;
