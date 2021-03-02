import React from "react";
import { Switch, Route } from "react-router-dom";
import { useIsFetching } from "react-query";

import Header from "./components/Header/Header";
import Home from "./pages/Home/Home.page";
import AccountPage from "./pages/Account/Accout.page";
import ProjectsPage from "./pages/Projects/Projects.page";
import ProjectPage from "./pages/Project/Project.page";
import TaskPage from "./pages/Task/Task.page";
import TasksPage from "./pages/Tasks/Tasks.page";
import UserPage from "./pages/User/User.page";
import Spinner from "./components/Spinner/Spinner";

const AuthenticatedApp = () => {
	const isGlobalFetching = useIsFetching();
	return (
		<div className='font-poppins flex min-h-screen'>
			<Header />
			<Switch>
				<Route path='/' exact>
					<Home />
				</Route>
				<Route path='/account' exact>
					<AccountPage />
				</Route>
				<Route path='/projects' exact>
					<ProjectsPage />
				</Route>
				<Route path='/tasks' exact>
					<TasksPage />
				</Route>
				<Route path='/projects/:projectId'>
					<ProjectPage />
				</Route>
				<Route path='/tasks/:taskId'>
					<TaskPage />
				</Route>
				<Route path='/user/:userId'>
					<UserPage />
				</Route>
			</Switch>
			{isGlobalFetching ? (
				<div className='fixed bottom-0 right-0 p-2 bg-black rounded-full'>
					<Spinner />
				</div>
			) : null}
		</div>
	);
};

export default AuthenticatedApp;
