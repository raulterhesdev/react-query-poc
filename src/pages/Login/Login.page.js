import React, { useState, useEffect } from "react";
import Spinner from "../../components/Spinner/Spinner";
import { useAuth } from "../../context/auth-context";

const Login = () => {
	const { login, register, isLoading } = useAuth();
	const [email, setEmail] = useState("test1@test.com");
	const [password, setPassword] = useState("Test1234");
	const [isRegister, setIsRegister] = useState(false);

	return (
		<div>
			<button onClick={() => setIsRegister((c) => !c)}>
				Switch to {isRegister ? "Login" : "Register"}
			</button>
			<input
				value={email}
				type='email'
				onChange={(e) => setEmail(e.currentTarget.value)}
				placeholder='Email'
			/>
			<input
				value={password}
				type='password'
				onChange={(e) => setPassword(e.currentTarget.value)}
				placeholder='Password'
			/>
			<button
				onClick={() => {
					const data = { email, password };
					isRegister ? register(data) : login(data);
				}}
			>
				{isRegister ? "Register" : "Login"}
			</button>
			{isLoading ? <Spinner /> : null}
		</div>
	);
};

export default Login;
