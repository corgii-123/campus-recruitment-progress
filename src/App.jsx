import { useLocalStorageState } from 'ahooks'
import React, { useState } from 'react'
import useSort from './utils/useSort'
import AutumnBody from './view/main/AutumnBody'
import AutumnHeader from './view/main/AutumnHeader'

function App() {
  const [applicationList, setApplicationList] = useLocalStorageState(
    'my-autumn-application-list',
    {
      defaultValue: []
    }
  )
  const [searchValue, setSearchValue] = useState('')

  const sortedApplicationList = useSort(applicationList)

  const onEditApplicationList = (newApplicationList) => {
    setApplicationList(newApplicationList)
  }
  const onAddNewApplication = (newApplication) => {
    setApplicationList((list) => [...list, newApplication])
  }
  return (
    <div className=" text-slate-600 relative top-0 left-0 w-full flex justify-center items-center flex-col font-bold font-sans">
      <AutumnHeader
        onSetSearchValue={setSearchValue}
        onAddNewApplication={onAddNewApplication}
      />
      <AutumnBody
        applicationList={sortedApplicationList}
        onEditApplicationList={onEditApplicationList}
        searchValue={searchValue}
      />
    </div>
  )
}

export default App
