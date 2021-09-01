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
								<Article
									key={index}
									article={article}
									language={country}
									showAddBookmark={isAuthenticated}
								/>
							))
						}
					</CountryContext.Consumer>
				)}
			</AuthContext.Consumer>
		</div>
	);
};

export default ArticlesList;
