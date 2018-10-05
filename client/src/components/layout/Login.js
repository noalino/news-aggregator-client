import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logIn, signUp } from '../../actions/userActions';
import styles from '../../styles/layout/Login.scss';

class Login extends Component {
  state = {
    username: '',
    password: '',
    loading: false
  }

  componentDidUpdate() {
    const { username, password, loading } = this.state;
    const { isRegistered, isAuthenticated, logIn, error } = this.props;
    
    if (!error && isRegistered && !isAuthenticated) {
      logIn({ username, password });
    }

    if ((error || isAuthenticated) && loading) {
      this.setState({ loading: false });
    }
  }

  handleChangeInput = e => {
    const { name, value } = e.target;
    
    this.setState({ [name]: value });
  }

  onSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    const { log, logIn, signUp } = this.props;
    
    log === 'login' ? logIn({ username, password }) : signUp({ username, password });
    
    this.setState({ loading: true });

    // if (log === 'login') {
    //   logIn(this.state);
    // } else if (log === 'signup') {
    //   signUp(this.state);
    // }
  }

  render() {
    const { username, password, loading } = this.state;
    const { log, location, isAuthenticated, error, message } = this.props;
    const { from } = location.state || { from: { pathname: "/" } };

    if (isAuthenticated) {
      return <Redirect to={from} />
    } else {
      return (
        <form className={styles.logForm} onSubmit={this.onSubmit}>
          <label htmlFor="email">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={this.handleChangeInput}
            placeholder="Enter your username here"
            required
          ></input>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={this.handleChangeInput}
            placeholder="Enter your password here"
            required
          ></input>
          {error && <p>{message}</p>}
          <button>
            {loading ? 'Loading' : log === 'login' ? 'Log in' : 'Create account'}
          </button>
  
          {
            log === 'signup' &&
            <p>
              Already have an account?{" "}
              <Link to="/login">Sign in here!</Link>
            </p>
          }
        </form>
      );
    }
  }
}

Login.propTypes = {
  log: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isRegistered: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  logIn: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  isRegistered: state.user.isRegistered,
  error: state.user.error,
  message: state.user.message
});

export default connect(mapStateToProps, { logIn, signUp })(Login);