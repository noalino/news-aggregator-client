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
	createToken: (
		cancelToken: CancelTokenType,
		{ login, password }: Credentials
	) => Promise<void>;
	signIn: (cancelToken: CancelTokenType) => Promise<void>;
	signOff: (cancelToken: CancelTokenType) => Promise<void>;
	addBookmark: (cancelToken: CancelTokenType) => Promise<void>;
}

type ObjectFromType<Type> = {
	[Property in keyof Type]: Type[Property];
};

// const axiosInstance = axios.create({
// 	baseURL: 'https://news-aggregator.benoitgelineau.com/api',
// });

const createAccount: UserServices['createAccount'] = async (
	cancelToken,
	{ login, password }
) => {
	try {
		console.log('createAccount');
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

const createToken: UserServices['createToken'] = async (
	cancelToken,
	{ login, password }
) => {
	try {
		console.log('createToken');
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

const signIn: UserServices['signIn'] = async (cancelToken) => {
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

const signOff: UserServices['signOff'] = async (cancelToken) => {
	try {
		console.log('signOff');
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
	createToken,
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
