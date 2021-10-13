import React from 'react';
import { AuthContext, CountryContext } from '@store/context';
import { Article, ArticleType } from '@components';
import '@styles/Articles.scss';

type ArticlesListProps = {
  articles: ArticleType[];
  isBookmarked?: boolean;
  removeArticle?: (id: string) => void;
};

const ArticlesList = ({
  articles,
  isBookmarked,
  removeArticle,
}: ArticlesListProps) => {
  return (
    <div className='articles'>
      <AuthContext.Consumer>
        {({ isAuthenticated }) => (
          <CountryContext.Consumer>
            {({ country }) =>
              articles.map((article, index) => (
                <React.Fragment key={index}>
                  <Article
                    article={article}
                    language={country}
                    showAddBookmark={isAuthenticated}
                    isBookmarked={isBookmarked}
                    removeArticle={removeArticle}
                  />
                  {/* Style for HTML without CSS */}
                  <hr />
                </React.Fragment>
              ))
            }
          </CountryContext.Consumer>
        )}
      </AuthContext.Consumer>
    </div>
  );
};

export default ArticlesList;
