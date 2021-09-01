import { AuthContext, CountryContext } from '@store/context';
import { Login } from '@components';
import { ReactComponent as Logo } from '@icons/logo.svg';
import { ReactComponent as MenuIcon } from '@icons/menu.svg';

interface NavBarProps {
	isExpanded: boolean;
	toggleExpand: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar = ({ isExpanded, toggleExpand }: NavBarProps) => {
	return (
		<nav id='navbar' className={isExpanded ? 'expanded' : undefined}>
			<ul>
				<li id='logo'>
					<Logo />
				</li>
				<li className='expand-container'>
					{isExpanded && (
						<AuthContext.Consumer>
							{(authContext) => <Login context={authContext} />}
						</AuthContext.Consumer>
					)}
					<div id='expand-button' onClick={() => toggleExpand(!isExpanded)}>
						<MenuIcon />
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
