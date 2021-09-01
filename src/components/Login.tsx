import { useState } from 'react';
import { Link } from 'react-router-dom';
import userApi from '@services/userApi';
import { AuthContextType } from '@store/context';
import { LoginForm } from '@components';

interface LoginProps {
	context: AuthContextType;
}

const Login = ({ context }: LoginProps) => {
	const { isAuthenticated, setIsAuthenticated } = context;
	const [errorMessage, setErrorMessage] = useState('');

	const handleOnSubmit = async (authenticate: () => Promise<void>) => {
		try {
			await authenticate();
			setIsAuthenticated(true);
			setErrorMessage('');
		} catch (error) {
			setErrorMessage(error.message);
		}
	};

	const handleLogout = async () => {
		try {
			await userApi('signOff').get();
			setIsAuthenticated(false);
		} catch (error) {
			console.log('signOff error:', error);
		}
	};

	return (
		<div id='login-view'>
			{!isAuthenticated ? (
				<>
					<LoginForm onSubmit={handleOnSubmit} />
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
