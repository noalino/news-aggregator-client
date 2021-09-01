import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from '@config/routes';
import { AuthContext, Country, CountryContext } from '@store/context';
import { Layout } from '@components';
import { NotFoundView } from '@views';

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	// Store country in localStorage, & retrieve it at init useState(() => { /* here */ })
	const [country, setCountry] = useState<Country>('us');

	const authContext = {
		isAuthenticated,
		setIsAuthenticated,
	};
	const countryContext = {
		country,
		setCountry,
	};

	useEffect(() => {
		// If token in cookie, try to authenticate & update isAthenticated
		// OR do it in useState(() => { /* here */ })
	}, []);

	return (
		<AuthContext.Provider value={authContext}>
			<CountryContext.Provider value={countryContext}>
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
							<Route component={NotFoundView} />
						</Switch>
					</Layout>
				</Router>
			</CountryContext.Provider>
		</AuthContext.Provider>
	);
};

export default App;
