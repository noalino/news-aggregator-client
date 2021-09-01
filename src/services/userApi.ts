import axios, { CancelToken as CancelTokenType } from 'axios';

interface Credentials {
	login: string;
	password: string;
}

interface UserServices {
	signUp: (
		cancelToken: CancelTokenType,
		{ login, password }: Credentials
	) => Promise<void>;
	signIn: (
		cancelToken: CancelTokenType,
		{ login, password }: Credentials
	) => Promise<void>;
	logout: (cancelToken: CancelTokenType) => Promise<void>;
}

type ObjectFromType<Type> = {
	[Property in keyof Type]: Type[Property];
};

// const axiosInstance = axios.create({
// 	baseURL: 'https://news-aggregator.benoitgelineau.com/api',
// });

const signUp: UserServices['signUp'] = async (
	cancelToken,
	{ login, password }
) => {
	try {
		console.log('signUp');
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

const signIn: UserServices['signIn'] = async (
	cancelToken,
	{ login, password }
) => {
	try {
		console.log('signIn');
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

const logout: UserServices['logout'] = async (cancelToken) => {
	try {
		console.log('logout');
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
	signUp,
	signIn,
	logout,
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
