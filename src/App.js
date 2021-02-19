import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import LoginPage from "./pages/Login/Login.page";
import AccountPage from "./pages/Account/Accout.page";
import ProjectsPage from "./pages/Projects/Projects.page";
import ProjectPage from "./pages/Project/Project.page";
import TaskPage from "./pages/Task/Task.page";

import { useAuth } from "./context/auth-context";
import { useCreateUserData } from "./hooks/mutations/useCreateUserData";

function App() {
	const { user } = useAuth();
	const createUserMutation = useCreateUserData();

	useEffect(() => {
		if (user?.additionalUserInfo.isNewUser) {
			createUserMutation.mutate({ uid: user.user.uid, email: user.user.email });
		}
	}, [user]);

	if (!user) return <LoginPage />;

	return (
		<div>
			<Header />
			<Switch>
				<Route path='/account'>
					<AccountPage />
				</Route>
				<Route path='/projects'>
					<ProjectsPage />
				</Route>
				<Route path='/project/:projectId'>
					<ProjectPage />
				</Route>
				<Route path='/tasks/:taskId'>
					<TaskPage />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
