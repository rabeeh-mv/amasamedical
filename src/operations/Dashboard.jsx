import React from 'react'
import StdDisplay from '../users/StdDisplay'

function Dashboard() {
  return (
    <>
      <div className='flex flex-wrap'>
        <div className='w-6/12'>
        <div className=' h-96 bg-white p-3 m-2' ><h2 className='p-4'>All Students List </h2><StdDisplay/> </div>
        <div className=' h-80 bg-white p-3 m-2'>all payments</div>
        </div>
        <div className='w-6/12'>
        <div className=' h-80 bg-white p-3 m-2'>all updates</div>
        <div className=' h-80 bg-white p-3 m-2'>all hospitals</div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
