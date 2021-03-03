import React, { useState, useEffect } from "react";

import { useAuth } from "../../context/auth-context";

import Spinner from "../../components/Spinner/Spinner";
import Input from "../../components/Input/InputAuth";
import Button from "../../components/Button/Button";
import Message from "../../components/Message/Message";

const Login = () => {
	const { login, register, isLoading, error } = useAuth();
	const [email, setEmail] = useState("test1@test.com");
	const [password, setPassword] = useState("Test1234");
	const [isRegister, setIsRegister] = useState(false);

	return (
		<div className='bg-yellow-500 h-screen flex justify-center items-center font-poppins '>
			<div className='bg-yellow-50 text-white px-8 py-6 flex flex-col content-center items-center rounded shadow w-96'>
				<Input
					value={email}
					type='email'
					onChange={(e) => setEmail(e.currentTarget.value)}
					label='Email'
					layoutVertical
				/>
				<Input
					value={password}
					type='password'
					onChange={(e) => setPassword(e.currentTarget.value)}
					label='Password'
					layoutVertical
				/>
				<Button
					onClick={() => {
						const data = { email, password };
						isRegister ? register(data) : login(data);
					}}
					text={isRegister ? "Register" : "Login"}
				/>
				<button
					className='text-yellow-900 hover:text-yellow-700  text-sm py-1 px-3 mt-1 focus:outline-none '
					onClick={() => setIsRegister((c) => !c)}
				>
					Switch to {isRegister ? "Login" : "Register"}
				</button>

				{error ? <Message text={error.message} type='error' /> : null}
				{isLoading ? <Spinner fullPage /> : null}
			</div>
		</div>
	);
};

export default Login;
