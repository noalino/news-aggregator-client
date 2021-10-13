import { AuthContext, CountryContext } from '@store/context';
import { Login } from '@components';
import { ReactComponent as Logo } from '@icons/logo.svg';
import { ReactComponent as MenuIcon } from '@icons/menu.svg';
import { ReactComponent as USFlag } from '@icons/flag-us.svg';
import { ReactComponent as FrFlag } from '@icons/flag-fr.svg';
import '@styles/NavBar.scss';

interface NavBarProps {
  isExpanded: boolean;
  toggleExpand: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar = ({ isExpanded, toggleExpand }: NavBarProps) => {
  return (
    <nav id='navbar' className={isExpanded ? 'expanded' : undefined}>
      <Logo id='logo' />
      <div className='expand-container'>
        {isExpanded && (
          <AuthContext.Consumer>
            {(authContext) => <Login context={authContext} />}
          </AuthContext.Consumer>
        )}
        <div id='expand-button' onClick={() => toggleExpand(!isExpanded)}>
          <MenuIcon />
        </div>
      </div>
      <div id='countries'>
        <CountryContext.Consumer>
          {({ country, setCountry }) => (
            <div className='countries-container'>
              <USFlag
                onClick={() => setCountry('us')}
                className={country === 'us' ? 'active' : undefined}
              />
              <FrFlag
                onClick={() => setCountry('fr')}
                className={country === 'fr' ? 'active' : undefined}
              />
            </div>
          )}
        </CountryContext.Consumer>
      </div>
    </nav>
  );
};

export default NavBar;
