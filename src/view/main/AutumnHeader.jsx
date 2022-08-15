import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Transition } from '@headlessui/react'
import InfoForm from '../../components/InfoForm/InfoForm'

function AutumnHeader({ onAddNewApplication, onSetSearchValue }) {
  const [isAdding, setIsAdding] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const closeAdding = () => {
    setIsAdding(false)
  }

  const handleSearch = () => {
    onSetSearchValue(searchValue)
  }
  return (
    <>
      <div className="py-2 w-[30vw]">
        <button
          className=" text-slate-50 h-[10vh] w-full bg-slate-600 transition-all rounded-md shadow-card-l hover:shadow-card-l-hover"
          type="button"
          onClick={() => setIsAdding(true)}
        >
          添加新投递
        </button>
        <div className="my-5 h-[10vh] flex">
          <input
            type="text"
            className="h-full w-[20vw] align-middles px-3 py-2 outline-none text-base hover:border-slate-300 focus:border-slate-300 rounded-md shadow-card-l hover:shadow-card-l-hover border-2 transition-all border-slate-100"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value)
            }}
          />
          <button
            className="text-slate-50 h-full flex-1 bg-slate-600 transition-all hover:bg-slate-400 rounded-md shadow-card-l hover:shadow-card-l-hover"
            type="button"
            onClick={handleSearch}
          >
            搜 索
          </button>
        </div>
      </div>
      <Transition
        show={isAdding}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <InfoForm
          onAddNewApplication={onAddNewApplication}
          closeAdding={closeAdding}
        />
      </Transition>
    </>
  )
}

AutumnHeader.propTypes = {
  onAddNewApplication: PropTypes.func.isRequired,
  onSetSearchValue: PropTypes.func.isRequired
}
export default AutumnHeader
