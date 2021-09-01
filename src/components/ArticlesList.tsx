import { CountryContext } from '@config/context';
import { Article } from '@components';
import '@styles/Articles.scss';

type ArticlesListProps = {
	articles: any[];
};

const ArticlesList = ({ articles }: ArticlesListProps) => {
	return (
		<div className='articles'>
			<CountryContext.Consumer>
				{({ country }) =>
					articles.map((article, index) => (
						<Article key={index} article={article} language={country} />
					))
				}
			</CountryContext.Consumer>
		</div>
	);
};

export default ArticlesList;
