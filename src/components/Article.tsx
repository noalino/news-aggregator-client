import { useState } from 'react';
import { formatDistance as formatDate } from 'date-fns';
import { enUS, fr } from 'date-fns/locale';
import userApi from '@services/userApi';

export type ArticleType = {
  id: string;
  author: string;
  publishedAt: Date;
  source: {
    name: string;
  };
  title: string;
  url: string;
};

interface ArticleProps {
  article: ArticleType;
  language: string;
  showAddBookmark: boolean;
  isBookmarked?: boolean;
  removeArticle?: (id: string) => void;
}

const Article = ({
  article,
  language,
  showAddBookmark,
  isBookmarked: canDeleteBookmark,
  removeArticle = () => {},
}: ArticleProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  let locale;
  switch (language) {
    case 'fr':
      locale = fr;
      break;
    case 'us':
    default:
      locale = enUS;
      break;
  }
  const formattedDate = formatDate(new Date(article.publishedAt), new Date(), {
    locale,
    addSuffix: true,
  });
  const addBookmark = async () => {
    if (isBookmarked) {
      return;
    }
    try {
      await userApi('addBookmark').get({ ...article, id: article.url });
      setIsBookmarked(true);
    } catch (e) {
      console.error('Cannot add article into bookmarks:', e);
    }
  };

  const deleteBookmark = async (id: string) => {
    try {
      await userApi('deleteBookmark').get(id);
      removeArticle(id);
    } catch (e) {
      console.error('Cannot remove article:', e);
    }
  };

  return (
    <article className={`article${isBookmarked ? ' bookmarked' : ''}`}>
      <div className='content'>
        <div className='content-top'>
          {canDeleteBookmark ? (
            <button
              className='delete-bookmark'
              onClick={() => deleteBookmark(article.url)}
            >
              Remove from Bookmarks
            </button>
          ) : (
            <button
              className='add-bookmark'
              onClick={() => addBookmark()}
              disabled={!showAddBookmark}
            >
              {isBookmarked ? 'Added to Bookmarks' : '+ Add to Bookmarks'}
            </button>
          )}
          {article.publishedAt && (
            <p className='published-date'>{formattedDate}</p>
          )}
        </div>
        {article.source?.name && (
          <div className='source'>
            <h3>{article.source.name}</h3>
          </div>
        )}
        {article.title && <h2 className='title'>{article.title}</h2>}
        {article.author && <em className='author'>by {article.author}</em>}
      </div>
      {article.url && (
        <div className='bottom-actions'>
          <a className='open-article-link' href={article.url}>
            Read now
          </a>
        </div>
      )}
    </article>
  );
};

export default Article;
