import { useEffect, useState } from 'react';
import newsApi from '@services/newsApi';
import { ArticlesList } from '@components';

const TopicView = ({ location, countryContext }: any) => {
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		// https://academind.com/tutorials/useeffect-abort-http-requests/
		// TODO Use props to extract topic from route, & set as useEffect hook variable
		// TODO Hook to handle country change
		const request = newsApi('getTopHeadlines');
		request
			.get({
				category: location.pathname.slice(1),
				country: countryContext.country,
			})
			.then((res) => {
				console.log('TopicView mounted -> getTopHeadlines:', res);
				setArticles(res);
			})
			.catch((error) => {
				console.log('[SERVICE] Cannot getTopHeadlines:', error.toJSON());
			});

		return () => request.cancel('TopicView id unmounted');
	}, [location.pathname, countryContext.country]);
	return <ArticlesList articles={articles} />;
};

export default TopicView;
