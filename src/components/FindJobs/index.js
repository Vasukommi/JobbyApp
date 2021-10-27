import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import TypeOfEmploymentFilter from '../TypeOfEmploymentFilter'
import SalaryRangeFilter from '../SalaryRangeFilter'
import JobCard from '../JobCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'Failure',
  loading: 'IS_LOADING',
  RequiredLength: 'ZERO',
}

class FindJobs extends Component {
  state = {
    apiProfileStatus: apiStatusConstants.initial,
    profileData: [],
    jobsData: [],
    userSearch: '',
    employFilter: '',
    salaryFilter: salaryRangesList[0].salaryRangeId,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.profileDetailsFetcher()
    this.jobDetailsFetcher()
  }

  onProfileFetchSuccess = data => {
    this.setState({profileData: data})
  }

  onJobDetailsFetchSuccess = data => {
    this.setState({
      jobsData: data,
    })
  }

  onUserSearch = event => {
    this.setState({userSearch: event.target.value})
  }

  onClickSearch = () => {
    this.setState(this.jobDetailsFetcher)
  }

  onSelectFilter = id => {
    this.setState({employFilter: id}, this.jobDetailsFetcher)
  }

  onSelectSalaryFilter = id => {
    this.setState({salaryFilter: id}, this.jobDetailsFetcher)
  }

  retryJobsApiCall = () => {
    this.jobDetailsFetcher()
    this.profileDetailsFetcher()
  }

  RetryButton = () => (
    <button
      onClick={this.retryJobsApiCall}
      type="button"
      className="retry-button"
    >
      Retry
    </button>
  )

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

  NotFound = () => (
    <div className="not-found">
      <img
        className="not-found-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="not-found-heading">Oops! Something Went Wrong</h1>
      <p className="error-type">
        We cannot seem to find the page you are looking for
      </p>
      {this.RetryButton()}
    </div>
  )

  profileDetailsFetcher = async () => {
    this.setState({apiProfileStatus: apiStatusConstants.loading})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const rawData = data.profile_details
      const updatedData = {
        name: rawData.name,
        profileImageUrl: rawData.profile_image_url,
        shortBio: rawData.short_bio,
      }
      this.onProfileFetchSuccess(updatedData)
      this.setState({apiProfileStatus: apiStatusConstants.success})
    }
    if (response.ok === false) {
      this.setState({apiProfileStatus: apiStatusConstants.failure})
    }
  }

  jobDetailsFetcher = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {employFilter, userSearch, salaryFilter} = this.state
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employFilter}&minimum_package=${salaryFilter}&search=${userSearch}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const rawData = data.jobs
      if (rawData.length === 0) {
        this.setState({apiStatus: apiStatusConstants.RequiredLength})
        return
      }
      const updatedData = rawData.map(eachObj => ({
        companyLogoUrl: eachObj.company_logo_url,
        employmentType: eachObj.employment_type,
        id: eachObj.id,
        jobDescription: eachObj.job_description,
        location: eachObj.location,
        packagePerAnnum: eachObj.package_per_annum,
        rating: eachObj.rating,
        title: eachObj.title,
      }))
      this.onJobDetailsFetchSuccess(updatedData)
      this.setState({apiStatus: apiStatusConstants.success})
    }
    if (response.ok === false) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderProfile = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData

    return (
      <div className="profile-card">
        <img className="profile-image" src={profileImageUrl} alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-role">{shortBio}</p>
      </div>
    )
  }

  renderTypeOfEmploymentFilter = () => (
    <div className="employment-filter-section">
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="employment-filter-container">
        {employmentTypesList.map(eachItem => (
          <TypeOfEmploymentFilter
            details={eachItem}
            onSelectFilter={this.onSelectFilter}
            key={eachItem.employmentTypeId}
          />
        ))}
      </ul>
    </div>
  )

  renderSalaryRangeFilter = () => (
    <div className="employment-filter-section">
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="employment-filter-container">
        {salaryRangesList.map(eachItem => (
          <SalaryRangeFilter
            details={eachItem}
            key={eachItem.salaryRangeId}
            onSelectSalaryFilter={this.onSelectSalaryFilter}
          />
        ))}
      </ul>
    </div>
  )

  renderSideBar = () => (
    <div className="side-bar-section">
      {this.finalProfileRenderFunction()}
      <hr className="line" />
      {this.renderTypeOfEmploymentFilter()}
      <hr className="line" />
      {this.renderSalaryRangeFilter()}
    </div>
  )

  renderContentSection = () => {
    const {jobsData, userSearch} = this.state

    return (
      <ul className="job-card-section">
        <input
          onChange={this.onUserSearch}
          value={userSearch}
          type="search"
          className="input-search"
          placeholder="Search"
        />
        <button
          onClick={this.onClickSearch}
          className="icon-button"
          type="button"
          testid="searchButton"
        >
          <BsSearch className="search-icon" />
        </button>
        {jobsData.map(eachItem => (
          <JobCard jobsData={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  finalJobsRenderFunction = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderContentSection()
      case apiStatusConstants.failure:
        return this.NotFound()
      case apiStatusConstants.loading:
        return this.renderLoader()
      case apiStatusConstants.RequiredLength:
        return this.noJobsView()
      default:
        return null
    }
  }

  finalProfileRenderFunction = () => {
    const {apiProfileStatus} = this.state
    switch (apiProfileStatus) {
      case apiStatusConstants.success:
        return this.renderProfile()
      case apiStatusConstants.failure:
        return <div className="profile-retry-button">{this.RetryButton()}</div>
      case apiStatusConstants.loading:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="find-jobs-section">
          {this.renderSideBar()}
          {this.finalJobsRenderFunction()}
        </div>
      </>
    )
  }
}

export default FindJobs
