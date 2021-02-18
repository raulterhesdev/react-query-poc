import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import LoginPage from "./pages/Login/Login.page";
import { useAuth } from "./context/auth-context";
import Account from "./pages/Account/Accout.page";
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
					<Account />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
