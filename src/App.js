import React, { useEffect, Suspense, lazy } from "react";
import LoginPage from "./pages/Login/Login.page";
import FullSpinner from "./components/FullSpinner/FullSpinner";

import { useAuth } from "./context/auth-context";
import { useCreateUserData } from "./hooks/mutations/useCreateUserData";

const AuthenticatedApp = lazy(() => import("./AuthenticatedApp"));

function App() {
	const { user } = useAuth();
	const createUserMutation = useCreateUserData();

	useEffect(() => {
		if (user?.additionalUserInfo.isNewUser) {
			createUserMutation.mutate({ uid: user.user.uid, email: user.user.email });
		}
	}, [user]);

	return (
		<Suspense fallback={FullSpinner}>
			{user ? <AuthenticatedApp /> : <LoginPage />}
		</Suspense>
	);
}

export default App;
