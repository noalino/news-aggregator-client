import { useEffect, useState } from 'react';
import newsApi from '@services/newsApi';
import { ArticlesList } from '@components';

const TopicView = ({ location, countryContext }: any) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // https://academind.com/tutorials/useeffect-abort-http-requests/
    const request = newsApi('getTopHeadlines');
    request
      .get({
        category: location.pathname.slice(1),
        country: countryContext.country,
      })
      .then((data) => {
        setArticles(data);
      })
      .catch((error) => {
        console.log('[SERVICE] Cannot getTopHeadlines:', error.toJSON());
      });

    return () => request.cancel('TopicView is unmounted');
  }, [location.pathname, countryContext.country]);
  return <ArticlesList articles={articles} />;
};

export default TopicView;
