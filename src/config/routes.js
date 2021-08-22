import { Redirect } from 'react-router-dom';
import topics from '@config/topics';
import { ArticlesList, NotFound, TopicsList } from '@components';

const topicsPaths = topics.map(({ name }) => `/${name}`);

const routes = [
	{
		path: '/',
		exact: true,
		children: () => <Redirect to={topicsPaths[0]} />,
	},
	{
		path: '/bookmarks',
		exact: true,
		children: () => <></>,
	},
	{
		path: '/:topic',
		exact: true,
		children: (props) => {
			if (!topicsPaths.includes(props.location.pathname)) {
				return <NotFound />;
			}
			return (
				<>
					<TopicsList />
					<ArticlesList number={10} {...props} />
				</>
			);
		},
	},
];

export default routes;
