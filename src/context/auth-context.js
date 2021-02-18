import React, { useState, useCallback, useMemo } from "react";
import firebase from "../utils/setup/firebase";

const AuthContext = React.createContext();
AuthContext.displayName = "AuthContext";

const AuthProvider = (props) => {
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const register = useCallback(
		({ email, password }) => {
			setIsLoading(true);
			firebase
				.auth()
				.createUserWithEmailAndPassword(email, password)
				.then((user) => {
					setUser(user);
					setIsLoading(false);
				})
				.catch((error) => {
					setError(error);
					setIsLoading(false);
				});
		},
		[setUser, setError]
	);

	const login = useCallback(
		({ email, password }) => {
			setIsLoading(true);
			firebase
				.auth()
				.signInWithEmailAndPassword(email, password)
				.then((user) => {
					setUser(user);
					setIsLoading(false);
				})
				.catch((error) => {
					setError(error);
					setIsLoading(false);
				});
		},
		[setUser, setError]
	);

	const logout = useCallback(() => {
		setIsLoading(true);
		firebase
			.auth()
			.signOut()
			.then(() => {
				setUser(null);
				setIsLoading(false);
			})
			.catch((error) => {
				setError(error);
				setIsLoading(false);
			});
	}, [setUser, setError]);

	const value = useMemo(
		() => ({ user, error, login, register, logout, isLoading }),
		[user, error, isLoading, login, register, logout]
	);

	return <AuthContext.Provider value={value} {...props} />;
};

function useAuth() {
	const context = React.useContext(AuthContext);
	if (context === undefined) {
		throw new Error(`useAuth must be used within a AuthProvider`);
	}
	return context;
}

export { AuthProvider, useAuth };
