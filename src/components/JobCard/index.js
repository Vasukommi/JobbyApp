import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'
import {FaMapMarkerAlt} from 'react-icons/fa'
import {TiShoppingBag} from 'react-icons/ti'

import './index.css'

const JobCard = props => {
  const {jobsData} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobsData

  return (
    <Link className="link-item" to={`/jobs/${id}`}>
      <li className="job-card">
        <div className="card-top-section">
          <img className="card-logo" src={companyLogoUrl} alt="company logo" />
          <div className="card-title-container">
            <h1 className="card-title">{title}</h1>
            <div className="card-rating-section">
              <AiFillStar
                style={{
                  height: '25px',
                  width: '25px',
                  color: '#fbbf24',
                  marginTop: '0px',
                }}
              />
              <p className="card-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="card-job-type-section">
          <div className="icon-section-flex">
            <div className="icon-container">
              <FaMapMarkerAlt />
              <p className="icon-name">{location}</p>
            </div>
            <div className="icon-container">
              <TiShoppingBag style={{height: '25px', width: '25px'}} />
              <p className="icon-name">{employmentType}</p>
            </div>
          </div>
          <p className="card-package">{packagePerAnnum}</p>
        </div>
        <hr className="line-card" />
        <div className="bottom-description">
          <h1 className="description-card">Description</h1>
          <p className="description-text">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
