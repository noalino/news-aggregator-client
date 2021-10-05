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
	addBookmark: (cancelToken: CancelTokenType, article: any) => Promise<void>;
	deleteBookmark: (
		cancelToken: CancelTokenType,
		articleId: string
	) => Promise<void>;
	getBookmarks: (cancelToken: CancelTokenType) => Promise<any>;
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
				withCredentials: true,
			}
		);
	} catch (err) {
		throw err;
	}
};

const addBookmark: UserServices['addBookmark'] = async (
	cancelToken,
	article
) => {
	try {
		await axiosInstance.post(
			'/bookmarks',
			{
				article,
			},
			{
				cancelToken,
				withCredentials: true,
			}
		);
	} catch (err) {
		throw err;
	}
};

const deleteBookmark: UserServices['deleteBookmark'] = async (
	cancelToken,
	articleId
) => {
	try {
		await axiosInstance.delete('/bookmarks', {
			cancelToken,
			data: {
				id: articleId,
			},
			withCredentials: true,
		});
	} catch (err) {
		throw err;
	}
};

const getBookmarks: UserServices['getBookmarks'] = async (cancelToken) => {
	try {
		const { data: articles } = await axiosInstance.get('/bookmarks', {
			cancelToken,
			withCredentials: true,
		});
		return articles;
	} catch (err) {
		throw err;
	}
};

const services: ObjectFromType<UserServices> = {
	createAccount,
	signIn,
	signOff,
	addBookmark,
	deleteBookmark,
	getBookmarks,
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
