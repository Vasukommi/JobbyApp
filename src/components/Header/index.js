import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const websiteLogo = 'https://assets.ccbp.in/frontend/react-js/logo-img.png'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-bar">
      <ul className="list-image">
        <Link className="nav-link" to="/">
          <li>
            <img className="site-logo" src={websiteLogo} alt="website logo" />
          </li>
        </Link>
      </ul>
      <ul className="nav-items-container">
        <Link className="nav-link" to="/">
          <li className="nav-item">Home</li>
        </Link>
        <Link className="nav-link" to="/jobs">
          <li className="nav-item">Jobs</li>
        </Link>
      </ul>
      <button onClick={onLogout} type="button" className="logout-button">
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
