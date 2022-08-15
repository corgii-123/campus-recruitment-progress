import React from 'react'
import PropTypes from 'prop-types'
import TaskCard from '../../components/TaskCard/TaskCard'

function AutumnBody(props) {
  const { applicationList, onEditApplicationList, searchValue } = props

  const handleEditApplicationList = (newApplication, i) => {
    const applicationListTemp = applicationList.slice()
    applicationListTemp[i] = newApplication
    onEditApplicationList(applicationListTemp)
  }
  const handleDeleteApplication = (i) => {
    const applicationListTemp = applicationList.slice()
    applicationListTemp.splice(i, 1)
    onEditApplicationList(applicationListTemp)
  }

  const renderList = () =>
    applicationList.map((application, i) => {
      const res = new RegExp(searchValue).test(application.company)
      if (res) {
        return (
          <li
            className="min-w-[14vw] h-auto my-5 transition-all hover:shadow-card-l-hover shadow-card-l filter rounded-md"
            key={application.id}
          >
            <TaskCard
              onEditApplication={(newApplication) => {
                handleEditApplicationList(newApplication, i)
              }}
              onDeleteApplication={() => {
                handleDeleteApplication(i)
              }}
              application={application}
            />
          </li>
        )
      }
      return null
    })
  return (
    <div className="w-[80vw] py-10">
      <ul className="flex flex-wrap justify-around">{renderList()}</ul>
    </div>
  )
}

AutumnBody.propTypes = {
  applicationList: PropTypes.arrayOf(
    PropTypes.shape({
      company: PropTypes.string,
      taskDate: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.oneOf(['']),
        PropTypes.string
      ]),
      state: PropTypes.number,
      isPass: PropTypes.number,
      id: PropTypes.string.isRequired,
      link: PropTypes.string
    })
  ).isRequired,
  onEditApplicationList: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired
}

export default AutumnBody
