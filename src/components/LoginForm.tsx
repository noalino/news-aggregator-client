import { useState } from 'react';
import userApi from '@services/userApi';

interface LoginFormProps {
	onSubmit: (event: any) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [shouldCreateAccount, setShouldCreateAccount] = useState(false);
	const [isAuthenticating, setIsAuthenticating] = useState(false);

	const handleCheckboxOnChange = ({ target }: any) => {
		setShouldCreateAccount(target.checked);
	};

	const authenticate = async () => {
		if (password.length < 6) {
			throw new Error('Password must contain at least 6 characters.');
		}

		const credentials = {
			login,
			password,
		};
		setIsAuthenticating(true);
		try {
			if (shouldCreateAccount) {
				await userApi('createAccount').get(credentials);
			}
			await userApi('signIn').get(credentials);
		} catch (e) {
			throw e;
		} finally {
			setIsAuthenticating(false);
		}
	};

	const handleOnSubmit = (event: any) => {
		event.preventDefault();
		onSubmit(authenticate);
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
			<div className='create-account-description'>
				<p>Don&apos;t have an account?</p>
				<label htmlFor='create-account'>
					<input
						id='create-account'
						type='checkbox'
						checked={shouldCreateAccount}
						onChange={handleCheckboxOnChange}
					/>
					<p>Check the box to create one.</p>
				</label>
			</div>
		</form>
	);
};

export default LoginForm;
