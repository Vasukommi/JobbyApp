import './index.css'

const SalaryRangeFilter = props => {
  const {details, onSelectSalaryFilter} = props
  const {label, salaryRangeId} = details

  const onClickSalary = () => {
    onSelectSalaryFilter(salaryRangeId)
  }

  return (
    <li className="each-filter">
      <input
        onClick={onClickSalary}
        name="action"
        value={salaryRangeId}
        id={salaryRangeId}
        className="box-input"
        type="radio"
      />
      <label className="label" htmlFor={salaryRangeId}>
        {label}
      </label>
    </li>
  )
}

export default SalaryRangeFilter
