import { Redirect, RouteChildrenProps } from 'react-router-dom';
import { AuthContext, CountryContext } from '@store/context';
import topics from '@config/topics';
import { NotFoundView, TopicView } from '@views';

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
		children: () => (
			<AuthContext.Consumer>
				{({ isAuthenticated }) =>
					isAuthenticated ? (
						<h1>Bookmarks</h1>
					) : (
						<Redirect to={topicsPaths[0]} />
					)
				}
			</AuthContext.Consumer>
		),
	},
	{
		path: '/:topic',
		exact: true,
		children: (props: RouteChildrenProps) => {
			if (!topicsPaths.includes(props.location.pathname)) {
				return <NotFoundView />;
			}
			return (
				<CountryContext.Consumer>
					{(context) => <TopicView {...props} countryContext={context} />}
				</CountryContext.Consumer>
			);
		},
	},
];

export default routes;
