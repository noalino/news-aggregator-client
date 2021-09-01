// import { format as formatDate } from 'date-fns';
// import { formatRelative as formatDate } from 'date-fns';
import { formatDistance as formatDate } from 'date-fns';
import { enUS, fr } from 'date-fns/locale';

const Article = ({ article, language }: any) => {
	// const formattedDate = formatDate(new Date(article.publishedAt), 'P', {
	// 	locale: fr,
	// });
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

	return (
		<article className='article'>
			<div className='content'>
				{article.publishedAt && (
					<div className='published-date'>
						<p>{formattedDate}</p>
					</div>
				)}
				{article.source?.name && (
					<div className='source'>
						<h3>{article.source.name}</h3>
					</div>
				)}
				{article.title && <h2 className='title'>{article.title}</h2>}
				{article.author && <em className='author'>by {article.author}</em>}
			</div>
			{article.url && (
				<a className='open-link' href={article.url}>
					Read now
				</a>
			)}
		</article>
	);
};

export default Article;
