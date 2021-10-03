import axios, { CancelToken as CancelTokenType } from 'axios';

interface Credentials {
	login: string;
	password: string;
}

interface UserServices {
	createAccount: (
		cancelToken: CancelTokenType,
		{ login, password }: Credentials
	) => Promise<void>;
	signIn: (
		cancelToken: CancelTokenType,
		{ login, password }: Credentials
	) => Promise<void>;
	signOff: (cancelToken: CancelTokenType) => Promise<void>;
	addBookmark: (cancelToken: CancelTokenType) => Promise<void>;
}

type ObjectFromType<Type> = {
	[Property in keyof Type]: Type[Property];
};

const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
});

const createAccount: UserServices['createAccount'] = async (
	cancelToken,
	{ login, password }
) => {
	try {
		// Set params to be sent with "x-www-form-urlencoded" format
		const params = new URLSearchParams();
		params.append('email', login);
		params.append('password', password);
		await axiosInstance.post('/account', params, {
			cancelToken,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		});
	} catch (err) {
		throw err;
	}
};

const signIn: UserServices['signIn'] = async (
	cancelToken,
	{ login, password }
) => {
	try {
		// Set params to be sent with "x-www-form-urlencoded" format
		const params = new URLSearchParams();
		params.append('email', login);
		params.append('password', password);
		await axiosInstance.post('/signIn', params, {
			cancelToken,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		});
	} catch (err) {
		throw err;
	}
};

const signOff: UserServices['signOff'] = async (cancelToken) => {
	try {
		await axiosInstance.post(
			'/signOff',
			{},
			{
				cancelToken,
			}
		);
	} catch (err) {
		throw err;
	}
};

const addBookmark: UserServices['addBookmark'] = async (cancelToken) => {
	try {
		console.log('addBookmark');
		const promise = new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(true);
			}, 2000);
		});
		await promise;
	} catch (err) {
		if (axios.isCancel(err)) {
			console.log('request is canceled:', err.message);
		} else {
			console.log('fetch error:', err);
		}
	}
};

const services: ObjectFromType<UserServices> = {
	createAccount,
	signIn,
	signOff,
	addBookmark,
};

const cancellableRequest = (action: keyof UserServices) => {
	const CancelToken = axios.CancelToken;
	const source = CancelToken.source();
	return {
		// TODO Change structure to have TS check for required params (ex: login, pwd)
		get: (params?: any) => services[action](source.token, params),
		cancel: (message?: string) => source.cancel(message),
	};
};

export default cancellableRequest;
