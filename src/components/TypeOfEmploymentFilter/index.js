import './index.css'

const TypeOfEmploymentFilter = props => {
  const {details, onSelectFilter} = props
  const {label, employmentTypeId} = details

  const onSelectItem = () => {
    onSelectFilter(employmentTypeId)
  }

  return (
    <li className="each-filter">
      <input
        onClick={onSelectItem}
        id={employmentTypeId}
        className="box-input"
        type="checkbox"
      />
      <label className="label" htmlFor={employmentTypeId}>
        {label}
      </label>
    </li>
  )
}

export default TypeOfEmploymentFilter
