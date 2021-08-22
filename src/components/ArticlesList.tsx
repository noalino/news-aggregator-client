import { Article } from '@components';

type ArticlesListProps = {
	number: number;
};

const ArticlesList = (props: ArticlesListProps) => {
	return (
		<div className='ArticlesList'>
			{Array.from({ length: props.number }).map((_, index) => (
				<Article key={index} />
			))}
		</div>
	);
};

export default ArticlesList;
