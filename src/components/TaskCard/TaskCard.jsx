import React, { useRef, Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { useCountDown } from 'ahooks'
import { Transition, Popover } from '@headlessui/react'
import InfoForm from '../InfoForm/InfoForm'

function TaskCard({ application, onEditApplication, onDeleteApplication }) {
  const [isEditing, setIsEditing] = useState(false)
  const status = useRef(['简历', '笔试', '一面', '二面', '三面', '四面'])
  const [, formattedRes] = useCountDown({
    targetDate: `${application.taskDate.split('T').join(' ')}:00`
  })
  const { days, hours, minutes, seconds } = formattedRes
  const shouldShowGap = () =>
    application.taskDate &&
    Date.now() < new Date(application.taskDate).getTime()
  const handleEdit = () => {
    setIsEditing(true)
  }

  return (
    <div
      className={`flex flex-col justify-between rounded-md h-full px-4 py-5 rounded-md${
        application.isPass === 2
          ? ' bg-emerald-500'
          : application.isPass === 1
          ? ' bg-red-400'
          : ' bg-amber-300'
      }`}
    >
      <a
        href={application.link}
        className="text-3xl hover:underline text-zinc-700"
        target="_black"
      >
        {application.company}
      </a>
      <ul className="my-3 flex-1">
        {Array.from({ length: application.state }, (_, i) => (
          <li key={status.current[i]}>{`${status.current[i]}✔️`}</li>
        ))}
        {application.isPass === 1 && (
          <li key="stop">{`${status.current[application.state]}❌`}</li>
        )}
        {application.isPass === 2 && (
          <li key="stop">{`${status.current[application.state]}✔️`}</li>
        )}
      </ul>
      {shouldShowGap() && (
        <div className="pb-3 text-lg text-slate-800">
          <p>
            距离
            {status.current[application.state]}
          </p>
          <p className=" mb-2">{`${application.taskDate}`}</p>
          <p className=" text-green-100 text-2xl drop-shadow-lg shadow-black">{`${days}天${hours}小时`}</p>
          <p className=" text-green-100 text-2xl relative top-0 left-10 drop-shadow-lg shadow-black">{`${minutes}分钟${seconds}秒`}</p>
        </div>
      )}
      <div className="flex w-full justify-around">
        <button
          className="text-slate-50 w-[40%] py-2 bg-slate-600 transition-all rounded-md shadow-card-l hover:shadow-card-l-hover"
          type="button"
          onClick={handleEdit}
        >
          编 辑
        </button>
        <Popover className=" cursor-pointer text-slate-50 text-center w-[40%] py-2 bg-slate-600 transition-all rounded-md shadow-card-l hover:shadow-card-l-hover">
          <Popover.Button className="text-center outline-none">
            删 除
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition-opacity duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Popover.Panel className="relative top-0 left-0">
              <button
                type="button"
                className="absolute top-3 left-0 text-slate-600 text-center w-full py-2 bg-transparent transition-all rounded-md shadow-card-l hover:shadow-card-l-hover"
                onClick={onDeleteApplication}
              >
                确 定
              </button>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
      <Transition
        show={isEditing}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <InfoForm
          onAddNewApplication={onEditApplication}
          closeAdding={() => setIsEditing(false)}
          application={application}
        />
      </Transition>
    </div>
  )
}

TaskCard.propTypes = {
  application: PropTypes.shape({
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
  }).isRequired,
  onEditApplication: PropTypes.func.isRequired,
  onDeleteApplication: PropTypes.func.isRequired
}
export default TaskCard
