import { useEffect, useState } from 'react';
import userApi from '@services/userApi';
import { ArticlesList } from '@components';

const BookmarksView = () => {
  const [articles, setArticles] = useState([]);

  const removeArticle = (articleId: string) => {
    setArticles((list) => list.filter(({ id }) => id !== articleId));
  };

  useEffect(() => {
    // https://academind.com/tutorials/useeffect-abort-http-requests/
    const request = userApi('getBookmarks');
    request
      .get()
      .then((data) => {
        setArticles(data);
      })
      .catch((error) => {
        console.log('[SERVICE] Cannot getBookmarks:', error.toJSON());
      });

    return () => request.cancel('BookmarksView is unmounted');
  }, []);
  return (
    <>
      <h2 id='bookmarks-title'>Bookmarks</h2>
      <ArticlesList
        articles={articles}
        removeArticle={removeArticle}
        isBookmarked
      />
    </>
  );
};

export default BookmarksView;
