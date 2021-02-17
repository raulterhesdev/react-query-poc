import { Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import LoginPage from "./pages/Login/Login.page";

function App() {
	//Check if the user is logged in, else return the login page onlye
	const isLoggedIn = false;
	if (!isLoggedIn) return <LoginPage />;

	//
	return (
		<div>
			<Header />
			<Switch></Switch>
		</div>
	);
}

export default App;
