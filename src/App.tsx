import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from '@config/routes';
import { Layout, NotFound } from '@components';

const App = () => {
	return (
		<Router>
			<Layout>
				<Switch>
					{routes.map((route, i) => (
						<Route
							key={i}
							path={route.path}
							exact={route.exact}
							children={route.children}
						/>
					))}
					<Route component={NotFound} />
				</Switch>
			</Layout>
		</Router>
	);
};

export default App;
