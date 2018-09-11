import React from 'react';
import { Link } from "react-router-dom";
import CountryDropdown from './CountryDropdown';
import styles from '../../styles/layout/Navbar.scss';

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.menu} aria-label="menu button">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <Link to="/" className={styles.logo}><h1>News</h1></Link>
      {/* <Link to="/log"><i className="fas fa-edit"></i><p>Sign up</p></Link> */}
      <Link to="/log"><i className="fas fa-sign-in-alt"></i><p>Log in or Sign up</p></Link>
      {/*<i className="fas fa-sign-out-alt"></i><p>Log Out</p>*/}
      <form>
        <input type="search" name="nav-search" placeholder="Search articles..."/>
        <Link to="/search"><button><i className="fas fa-search"></i></button></Link>
      </form>
      <CountryDropdown />
    </nav>
  );
}

export default Navbar;