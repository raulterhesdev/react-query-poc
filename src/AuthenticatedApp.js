import React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Home from "./pages/Home/Home.page";
import AccountPage from "./pages/Account/Accout.page";
import ProjectsPage from "./pages/Projects/Projects.page";
import ProjectPage from "./pages/Project/Project.page";
import TaskPage from "./pages/Task/Task.page";
import TasksPage from "./pages/Tasks/Tasks.page";

const AuthenticatedApp = () => {
	return (
		<>
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
				<Route path='/project/:projectId'>
					<ProjectPage />
				</Route>
				<Route path='/tasks/:taskId'>
					<TaskPage />
				</Route>
			</Switch>
		</>
	);
};

export default AuthenticatedApp;
