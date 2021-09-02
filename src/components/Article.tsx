import { formatDistance as formatDate } from 'date-fns';
import { enUS, fr } from 'date-fns/locale';
import userApi from '@services/userApi';

const Article = ({ article, language, showAddBookmark }: any) => {
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
	const addBookmark = () => {
		userApi('addBookmark').get();
	};

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
				<div className='bottom-actions'>
					<a className='open-article-link' href={article.url}>
						Read now
					</a>
					{showAddBookmark && (
						<button className='add-bookmark' onClick={() => addBookmark()}>
							<span>Add</span>
							<span> to Bookmarks</span>
						</button>
					)}
				</div>
			)}
		</article>
	);
};

export default Article;
