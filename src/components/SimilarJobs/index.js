import {AiFillStar} from 'react-icons/ai'
import {FaMapMarkerAlt} from 'react-icons/fa'
import {TiShoppingBag} from 'react-icons/ti'

import './index.css'

const SimilarJobs = props => {
  const {similarJobs} = props

  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobs

  return (
    <li className="similar-jobs-card">
      <div className="card-top-section">
        <img
          className="card-logo"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
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
      <h1 className="card-title">Description</h1>
      <p className="card-description">{jobDescription}</p>
      <div className="card-job-type-section">
        <div className="add-space">
          <div className="icon-container">
            <FaMapMarkerAlt />
            <p className="icon-name">{location}</p>
          </div>
          <div className="icon-container">
            <TiShoppingBag style={{height: '25px', width: '25px'}} />
            <p className="icon-name">{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
