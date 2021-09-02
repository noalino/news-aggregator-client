import React from 'react';
import { AuthContext, CountryContext } from '@store/context';
import { Article } from '@components';
import '@styles/Articles.scss';

type ArticlesListProps = {
	articles: any[];
};

const ArticlesList = ({ articles }: ArticlesListProps) => {
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
