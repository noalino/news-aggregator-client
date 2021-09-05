import axios, { CancelToken as CancelTokenType } from 'axios';
import { Country } from '@store/context';

type Category =
	| 'general'
	| 'business'
	| 'entertainment'
	| 'health'
	| 'science'
	| 'sports'
	| 'technology';

interface TopHeadlinesParams {
	category: Category;
	country: Country;
}

interface NewsServices {
	getTopHeadlines: (
		cancelToken: CancelTokenType,
		params: TopHeadlinesParams
	) => Promise<any>;
}

type ObjectFromType<Type> = {
	[Property in keyof Type]: Type[Property];
};

const axiosInstance = axios.create({
	baseURL: '/api',
});

const getTopHeadlines: NewsServices['getTopHeadlines'] = async (
	cancelToken,
	params
) => {
	try {
		const { data: articles } = await axiosInstance.get('/news', {
			cancelToken,
			params,
		});
		return articles;
	} catch (err) {
		if (axios.isCancel(err)) {
			console.log('request is canceled:', err.message);
		} else {
			console.log('fetch error:', err);
		}
		return [];
	}
};

const services: ObjectFromType<NewsServices> = {
	getTopHeadlines,
};

const cancellableRequest = (action: keyof NewsServices) => {
	const CancelToken = axios.CancelToken;
	const source = CancelToken.source();
	return {
		get: (params: any) => services[action](source.token, params),
		cancel: (message?: string) => source.cancel(message),
	};
};

export default cancellableRequest;
