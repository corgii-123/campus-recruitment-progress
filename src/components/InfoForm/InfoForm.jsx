import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'

function InfoForm({
  onAddNewApplication,
  closeAdding,
  application: editingApplication
}) {
  const [application, setApplication] = useState(editingApplication)

  const status = useRef(['简历', '笔试', '一面', '二面', '三面', '四面'])
  const progress = useRef(['持续中', '已挂掉', '已offer'])
  const handleAddNewApplication = () => {
    closeAdding()
    if (application.company === '') {
      return
    }
    onAddNewApplication({ ...application, id: `_${Date.now()}` })
    setApplication({
      company: '',
      taskDate: '',
      state: 0,
      isPass: 0,
      link: ''
    })
  }
  return (
    <div className=" fixed top-0 left-0 h-[100vh] w-[100vw] flex justify-center items-center bg-slate-400 transition-all text-slate-800">
      <div className="relative p-5 h-[80vh] shadow-card-l hover:shadow-card-l-hover bg-gray-300 hover:bg-slate-400 transition-all duration-500 rounded-lg w-[30vw] flex justify-around items-center flex-col">
        <button
          id="close"
          className="absolute z-10 top-[-6.5vh] right-[-1.5vw] text-slate-600 text-7xl -rotate-45 hover:-rotate-0 hover:text-slate-200 cursor-pointer transition-all duration-300"
          onClick={() => closeAdding()}
          type="button"
        >
          +
        </button>
        <input
          type="text"
          id="company"
          value={application.company}
          className="w-[20vw] align-middles px-3 py-2 outline-none text-base hover:border-slate-300 rounded-md shadow-card-l hover:shadow-card-l-hover border-2 transition-all border-slate-100"
          placeholder="请填写公司名称"
          onChange={(e) => {
            setApplication({ ...application, company: e.target.value })
          }}
        />
        <input
          type="text"
          id="link"
          value={application.link}
          className="w-[20vw] align-middles px-3 py-2 outline-none text-base hover:border-slate-300 rounded-md shadow-card-l hover:shadow-card-l-hover border-2 transition-all border-slate-100"
          placeholder="请粘贴官网链接地址"
          onChange={(e) => {
            setApplication({ ...application, link: e.target.value })
          }}
        />
        <div className="w-full">
          <p className=" text-xl py-2 text-slate-900">当前进度：</p>
          <div className="flex justify-around items-center w-full">
            {status.current.map((v, i) => (
              <label key={v} htmlFor={v} className="cursor-pointer">
                <span>{v}</span>
                <input
                  name="state"
                  type="radio"
                  value={i}
                  defaultChecked={application.state === i}
                  onChange={(e) => {
                    setApplication({
                      ...application,
                      state: Number(e.target.value)
                    })
                  }}
                  id={v}
                  className=" ml-1 scale-125 align-middle  bg-slate-200 text-slate-300 "
                />
              </label>
            ))}
          </div>
        </div>
        <div>
          <span className=" text-xl py-2 text-slate-900">接下来的时间点</span>
          <input
            type="datetime-local"
            value={application.taskDate}
            className="outline-none rounded-md p-3 mx-2"
            onChange={(e) => {
              setApplication({
                ...application,
                taskDate: e.target.value
              })
            }}
          />
        </div>
        <div className="w-full">
          <p className=" text-xl py-2 text-slate-900">当前状态：</p>
          <div className="flex justify-around items-center w-full">
            {progress.current.map((v, i) => (
              <label key={v} htmlFor={v} className="cursor-pointer">
                <span>{v}</span>
                <input
                  name="progress"
                  type="radio"
                  defaultChecked={application.isPass === i}
                  value={i}
                  onChange={(e) => {
                    setApplication({
                      ...application,
                      isPass: Number(e.target.value)
                    })
                  }}
                  id={v}
                  className=" ml-1 scale-125 align-middle  bg-slate-200 text-slate-300 "
                />
              </label>
            ))}
          </div>
        </div>
        <button
          className="text-slate-50 w-[20vw] h-[10vh] text-xl bg-slate-600 transition-all hover:bg-slate-400 rounded-md shadow-card-l hover:shadow-card-l-hover"
          type="button"
          onClick={handleAddNewApplication}
        >
          添加/编辑
        </button>
      </div>
    </div>
  )
}

InfoForm.propTypes = {
  onAddNewApplication: PropTypes.func.isRequired,
  closeAdding: PropTypes.func.isRequired,
  application: PropTypes.shape({
    company: PropTypes.string,
    taskDate: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.oneOf(['']),
      PropTypes.string
    ]),
    state: PropTypes.number,
    isPass: PropTypes.number,
    link: PropTypes.string
  })
}
InfoForm.defaultProps = {
  application: {
    company: '',
    taskDate: '',
    state: 0,
    isPass: 0,
    link: ''
  }
}

export default InfoForm
