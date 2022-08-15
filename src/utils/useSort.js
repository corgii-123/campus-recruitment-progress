import { useEffect, useState } from 'react'

export default (list) => {
  const [sortedList, setSortedList] = useState(list)
  useEffect(() => {
    const sortedListTemp = list.slice()
    sortedListTemp.sort((a, b) => {
      switch (a.isPass) {
        case 0: {
          if (b.isPass === 0) {
            if (a.taskDate) {
              if (b.taskDate) {
                const currentTime = Date.now()
                const aToNow = new Date(a.taskDate).getTime() - currentTime
                const bToNow = new Date(b.taskDate).getTime() - currentTime
                if (aToNow < 0) {
                  return 1
                }
                if (bToNow < 0) {
                  return -1
                }
                return aToNow - bToNow
              }
              return -1
            }
            return 1
          }
          return -1
        }
        case 1: {
          return 1
        }
        case 2: {
          if (b.isPass === 1) {
            return -1
          }
          return 1
        }
        default:
          return -1
      }
    })
    setSortedList(sortedListTemp)
  }, [list, setSortedList])
  return sortedList
}
