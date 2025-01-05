import React from 'react'
import StdDisplay from '../users/StdDisplay'
import PayDisplay from '../users/PayDisplay'
import UpDisplay from '../users/UpDisplay'

function Dashboard() {
  return (
    <>
      <div className='flex flex-wrap mb-5'>
        <div className='w-full sm:w-6/12'>
        <div className=' h-96 bg-white p-3 mb-3 overflow-auto ' ><h2 className='p-4 sticky'>All Students List </h2>< StdDisplay/> </div>
        <div className=' h-80 bg-white p-3   overflow-auto'><h2 className='p-4 sticky'>all payments</h2><PayDisplay/></div>
        </div>
        <div className='w-full sm:w-6/12'>
        <div className=' h-80 bg-white p-3 mb-3 overflow-auto'> <h2 className='p-4 sticky'>all updates</h2><UpDisplay/></div>
        <div className=' h-80 bg-white p-3 overflow-auto '>all hospitals</div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
