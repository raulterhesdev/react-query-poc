import React from "react";
import AddTask from "../../pages/Home/components/AddTask";
import AddProject from "../../pages/Home/components/AddProject";
import { useLoggedUser } from "../../hooks/queries/userQueries";

import { NavLink } from "react-router-dom";

const NavItem = ({ to, text, exact }) => {
	return (
		<li className='py-2 border-b-2 border-transparent '>
			<NavLink
				exact={exact}
				to={to}
				className='py-2 px-4 border-l-2 border-transparent text-white '
				activeClassName='border-l-2 border-white'
			>
				{text}
			</NavLink>
		</li>
	);
};

const Navigation = ({ userId }) => {
	return (
		<ul>
			<NavItem to='/' text='Home' exact />
			<NavItem to='/projects' text='Projects' />
			<NavItem to='/tasks' text='Tasks' />
			<NavItem to='/account' text='Account' />
			<NavItem to={`/user/${userId}`} text='Your Work' />
		</ul>
	);
};

const Header = () => {
	const { data: userData } = useLoggedUser();
	return (
		<div className='bg-yellow-500 px-4 py-6 fixed top-0 left-0 h-full shadow'>
			<Navigation userId={userData.uid} />
			<div className='bg-white rounded mt-8'>
				<p className='text-yellow-900 text-center'>Actions:</p>
				<AddTask />
				{userData?.role === "TL" ? <AddProject /> : null}
			</div>
		</div>
	);
};

export default Header;
