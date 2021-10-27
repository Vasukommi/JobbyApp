import Header from '../Header'

import './index.css'

const notFoundImage =
  'https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found">
      <img className="not-found-image" src={notFoundImage} alt="not found" />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="error-type">
        we’re sorry, the page you requested could not be found
      </p>
    </div>
  </>
)

export default NotFound
