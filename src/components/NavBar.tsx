import { AuthContext, CountryContext } from '@config/context';
import { Login } from '@components';

interface NavBarProps {
	isExpanded: boolean;
	toggleExpand: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar = ({ isExpanded, toggleExpand }: NavBarProps) => {
	return (
		<nav id='navbar' className={isExpanded ? 'expanded' : undefined}>
			<ul>
				<li>News</li>
				<li className='expand-container'>
					{isExpanded && (
						<AuthContext.Consumer>
							{(authContext) => <Login context={authContext} />}
						</AuthContext.Consumer>
					)}
					<div id='expand-button' onClick={() => toggleExpand(!isExpanded)}>
						<div />
					</div>
				</li>
				<li>
					<CountryContext.Consumer>
						{({ setCountry }) => (
							<div>
								<button onClick={() => setCountry('fr')}>FR</button>
								<button onClick={() => setCountry('us')}>US</button>
							</div>
						)}
					</CountryContext.Consumer>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
