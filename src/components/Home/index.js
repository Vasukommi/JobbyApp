import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-section">
      <div className="text-section">
        <h1 className="home-title">Find The Job That Fits Your Life </h1>
        <p className="home-description">
          Millions of people are searching for jobs, salary, information,
          company reviews. Find the job that fits your abilities and potential
        </p>
        <Link className="nav-link" to="/jobs">
          <button className="find-job-button" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default Home
