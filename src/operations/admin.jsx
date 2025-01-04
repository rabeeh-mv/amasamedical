import React, { useState } from 'react'
import Addstd from '../Addstd/Addstd'
import Hospitals from '../Hospital/hospitals'
import Payment from '../payment/payment'
import AddUpdates from '../Updates/AddUpdates'
import Dashboard from './Dashboard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faMoneyBillAlt ,faHospital,faPlusSquare  } from '@fortawesome/free-regular-svg-icons'
function admin() {
  const [activeCombonet, setactiveCombonet]= useState('dashboard')
  const list = (data)=>{
    setactiveCombonet(data)
  }
  return (
    <div className='p-6 bg-gray-100 '>
      <h2 className='text-2xl font-semibold' onClick={()=>list('dashboard')}>Dashboard</h2>
      <p className='text-sm font-normal text-slate-600 mb-3 leading-3'>Amasa medical Admin Dashboard</p>
      <div className='flex justify-between'>
          <div className="w-1/5 h-24 bg-white m-6 border-b-4 border-yellow-500 flex justify-around items-center"onClick={()=>list('student')}>
          <h4 className=' text-xl font-semibold '>Add student </h4>
          <FontAwesomeIcon className='troke-2 text-4xl scale-90 ' icon={faUser}/>
          </div>
          <div className="w-1/5 h-24 bg-white m-6 border-b-4 border-yellow-500 flex justify-around items-center"onClick={()=>list('hospital')}>
          <h4 className='text-xl font-semibold p'>Add hospital</h4>
          <FontAwesomeIcon className=' troke-2 text-4xl scale-80 ' icon={faHospital}/></div>
          <div className="w-1/5 h-24 bg-white m-6 border-b-4 border-yellow-500 flex justify-around items-center"onClick={()=>list('payment')}>
          <h4 className='text-xl font-semibold '>Payment</h4>
          <FontAwesomeIcon className=' troke-2 text-4xl scale-80' icon={faMoneyBillAlt}/>
          </div>
          <div className="w-1/5 h-24 bg-white m-6 border-b-4 border-yellow-500 flex justify-around items-center"onClick={()=>list('Updates')}>
          <h4 className='text-xl font-semibold '>Add Updates</h4>
          <FontAwesomeIcon className=' troke-2 text-4xl scale-90 ' icon={faPlusSquare }/></div>
      </div>
      <div className='mt-6'>
      {activeCombonet === 'dashboard' && <Dashboard/>}
      {activeCombonet === 'student' && <Addstd/>}
      {activeCombonet === 'hospital' && <Hospitals/>}
      {activeCombonet === 'payment' && <Payment/>}
      {activeCombonet === 'Updates' && <AddUpdates/>}
      </div>
      
    </div>
  )
}

export default admin
