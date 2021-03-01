import React from "react";

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

const Navigation = () => {
	return (
		<ul>
			<NavItem to='/' text='Home' exact />
			<NavItem to='/projects' text='Projects' />
			<NavItem to='/tasks' text='Tasks' />
			<NavItem to='/account' text='Account' />
		</ul>
	);
};

const Header = () => {
	return (
		<div className='bg-yellow-500 px-8 py-6 fixed top-0 left-0 h-full shadow'>
			<Navigation />
		</div>
	);
};

export default Header;
