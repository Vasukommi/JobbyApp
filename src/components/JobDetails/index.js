import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {AiFillStar} from 'react-icons/ai'
import {FaMapMarkerAlt} from 'react-icons/fa'
import {TiShoppingBag} from 'react-icons/ti'
import {BiLinkExternal} from 'react-icons/bi'

import Header from '../Header'
import Skills from '../Skills'
import SimilarJobs from '../SimilarJobs'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'Failure',
  loading: 'IS_LOADING',
}

class JobDetails extends Component {
  state = {
    detailedJobData: [],
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.fetchJobDetailedData()
  }

  onDetailedJobFetchSuccess = (data, updatedSimilarJobs) => {
    this.setState({
      detailedJobData: data,
      similarJobsData: updatedSimilarJobs,
    })
  }

  noJobsView = () => (
    <div className="no-jobs-view-section">
      <img
        className="no-jobs-image"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  fetchJobDetailedData = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    const rawData = data.job_details
    const updatedData = {
      companyLogoUrl: rawData.company_logo_url,
      companyWebsiteUrl: rawData.company_website_url,
      employmentType: rawData.employment_type,
      id: rawData.id,
      jobDescription: rawData.job_description,
      lifeAtCompany: rawData.life_at_company,
      location: rawData.location,
      packagePerAnnum: rawData.package_per_annum,
      rating: rawData.rating,
      skills: rawData.skills,
      title: rawData.title,
    }

    const similarJobs = data.similar_jobs
    const updatedSimilarJobs = similarJobs.map(eachItem => ({
      companyLogoUrl: eachItem.company_logo_url,
      employmentType: eachItem.employment_type,
      id: eachItem.id,
      jobDescription: eachItem.job_description,
      location: eachItem.location,
      rating: eachItem.rating,
      title: eachItem.title,
    }))
    if (response.ok === true) {
      this.onDetailedJobFetchSuccess(updatedData, updatedSimilarJobs)
      this.setState({apiStatus: apiStatusConstants.success})
    }

    if (response.ok === false) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderDetailedJob = () => {
    const {detailedJobData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = detailedJobData

    const modifyData = {
      description: lifeAtCompany.description,
      imageUrl: lifeAtCompany.image_url,
    }

    const {description, imageUrl} = modifyData

    return (
      <div className="detailed-job-page">
        <div className="detailed-job-card">
          <div className="card-top-section">
            <img
              className="card-logo"
              src={companyLogoUrl}
              alt="job details company logo"
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
            <div className="disc-and-site-link">
              <h1 className="description-card">Description</h1>
              <a
                className="external-link"
                href={companyWebsiteUrl}
                target="_blank"
                rel="noreferrer"
              >
                <p className="link-style">Visit</p>
                <BiLinkExternal />
              </a>
            </div>
            <p className="description-text">{jobDescription}</p>
          </div>
          <h1 className="description-card">Skills</h1>
          <ul className="card-skill-section">
            {skills.map(eachItem => (
              <Skills skillData={eachItem} key={eachItem.name} />
            ))}
          </ul>
          <h1 className="description-card">Life at company</h1>
          <div className="about-company-section">
            <p className="description-text">{description}</p>
            <img className="job-image" src={imageUrl} alt="life at company" />
          </div>
        </div>
      </div>
    )
  }

  renderSimilarJobs = () => {
    const {similarJobsData} = this.state

    return (
      <>
        <h1>Similar Jobs</h1>
        <ul className="render-similar-jobs-section">
          {similarJobsData.map(eachItem => (
            <SimilarJobs similarJobs={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </>
    )
  }

  renderLoader = () => (
    <div className="loader-container-job" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  finalJobsRenderFunction = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return (
          <>
            {this.renderDetailedJob()}
            {this.renderSimilarJobs()}
          </>
        )
      case apiStatusConstants.failure:
        return this.noJobsView()
      case apiStatusConstants.loading:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-details-page">
        <Header />
        {this.finalJobsRenderFunction()}
      </div>
    )
  }
}

export default JobDetails
