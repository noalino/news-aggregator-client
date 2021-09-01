import { useState } from 'react';
import { Link } from 'react-router-dom';
import userApi from '@services/userApi';
import { AuthContextType } from '@config/context';
import { LoginForm } from '@components';

interface LoginProps {
	context: AuthContextType;
}

const Login = ({ context }: LoginProps) => {
	const { isAuthenticated, setIsAuthenticated } = context;
	const [isAuthenticating, setIsAuthenticating] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const handleOnSubmit = async (
		error: Error | null,
		authenticate: Promise<any>
	) => {
		if (error !== null) {
			setErrorMessage(error.message);
			return;
		}

		setIsAuthenticating(true);
		try {
			await authenticate;
			setIsAuthenticated(true);
			setErrorMessage('');
		} catch (error) {
			setErrorMessage(error.message);
		} finally {
			setIsAuthenticating(false);
		}
	};

	const handleLogout = async () => {
		try {
			await userApi('logout').get();
			setIsAuthenticated(false);
		} catch (error) {
			console.log('Logout error:', error);
		}
	};

	return (
		<div id='login-view'>
			{!isAuthenticated ? (
				<>
					<LoginForm
						onSubmit={handleOnSubmit}
						isAuthenticating={isAuthenticating}
					/>
					{errorMessage && <p>{errorMessage}</p>}
				</>
			) : (
				<>
					<Link to='/bookmarks'>Bookmarks</Link>
					<button onClick={handleLogout}>Logout</button>
				</>
			)}
		</div>
	);
};

export default Login;
