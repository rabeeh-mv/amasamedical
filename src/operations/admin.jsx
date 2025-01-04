import React, { useState } from 'react'
import Addstd from '../Addstd/Addstd'
import Hospitals from '../Hospital/hospitals'
import Payment from '../payment/payment'
import AddUpdates from '../Updates/AddUpdates'

function admin() {
  const [activeCombonet, setactiveCombonet]= useState('student')
  const list = (data)=>{
    setactiveCombonet(data)
  }
  return (
    <div>
      <h2>admin panel</h2>
      <div>
        <ul>
          <li onClick={()=>list('student')}>add student</li>
          <li onClick={()=>list('hospital')}>add hospital</li>
          <li onClick={()=>list('payment')}>payment</li>
          <li onClick={()=>list('Updates')}>add Updates</li>
        </ul>
      </div>
      {activeCombonet === 'student' && <Addstd/>}
      {activeCombonet === 'hospital' && <Hospitals/>}
      {activeCombonet === 'payment' && <Payment/>}
      {activeCombonet === 'Updates' && <AddUpdates/>}
    </div>
  )
}

export default admin
