import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const loginLogo = 'https://assets.ccbp.in/frontend/react-js/logo-img.png'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    errorMessage: '',
  }

  // state update functions

  updateUsername = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  // update Cookie on success

  onLoginSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  // update error message on fail

  onLoginFail = error => {
    this.setState({
      errorMessage: error,
      showError: true,
    })
  }

  // Login API

  onLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.onLoginFail(data.error_msg)
    }
    console.log(data)
  }

  // UI render functions

  renderUsernameInput = () => {
    const {username} = this.state

    return (
      <>
        <label className="login-label" htmlFor="userInput">
          USERNAME
        </label>
        <br />
        <input
          onChange={this.updateUsername}
          value={username}
          className="login-input"
          type="text"
          id="userInput"
          placeholder="Username"
        />
      </>
    )
  }

  renderPasswordInput = () => {
    const {password} = this.state

    return (
      <>
        <label className="login-label" htmlFor="password">
          PASSWORD
        </label>
        <br />
        <input
          onChange={this.updatePassword}
          value={password}
          className="login-input"
          type="password"
          id="password"
          placeholder="Password"
        />
      </>
    )
  }

  // main render

  render() {
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    const {showError, errorMessage} = this.state
    return (
      <div className="login-page">
        <div className="login-card">
          <img
            className="login-page-site-logo"
            src={loginLogo}
            alt="website logo"
          />
          <form className="login-form" onSubmit={this.onLogin}>
            <br />
            {this.renderUsernameInput()}
            <br />
            {this.renderPasswordInput()}
            <br />
            <button type="submit" className="login-button">
              Login
            </button>
            {showError && <p className="error-message">{`*${errorMessage}`}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
