import { useState } from 'react';
import userApi from '@services/userApi';

interface LoginFormProps {
	isAuthenticating: boolean;
	onSubmit: (error: Error | null, event: any) => void;
}

const LoginForm = ({ isAuthenticating, onSubmit }: LoginFormProps) => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [shouldCreateAccount, setShouldCreateAccount] = useState(false);

	const handleCheckboxOnChange = ({ target }: any) => {
		console.log('handleCheckboxOnChange -> target.checked', target.checked);
		setShouldCreateAccount(target.checked);
	};

	const handleOnSubmit = (event: any) => {
		console.log('handleOnSubmit', event);
		event.preventDefault();
		let error = null;
		if (password.length < 6) {
			error = new Error('Password must contain at least 6 characters.');
		}

		const credentials = {
			login,
			password,
		};
		const action = shouldCreateAccount ? 'signUp' : 'signIn';
		const authenticate = userApi(action).get(credentials);
		onSubmit(error, authenticate);
	};

	return (
		<form id='login-form' onSubmit={handleOnSubmit}>
			<label htmlFor='login'>
				<input
					type='email'
					name='login'
					id='login'
					value={login}
					onChange={({ target }) => setLogin(target.value)}
					placeholder='Email'
					required
				/>
			</label>
			<label htmlFor='password'>
				<input
					type='password'
					name='password'
					id='password'
					value={password}
					onChange={({ target }) => setPassword(target.value)}
					placeholder='Password'
					required
				/>
			</label>
			<button type='submit' disabled={isAuthenticating}>
				Login
			</button>
			<p>Don&apos;t have an account?</p>
			<label htmlFor='create-account'>
				<p>Check the box to create one:</p>
				<input
					id='create-account'
					type='checkbox'
					checked={shouldCreateAccount}
					onChange={handleCheckboxOnChange}
				/>
			</label>
		</form>
	);
};

export default LoginForm;
