import React, { useState } from 'react'
import { db } from "../firebase";
import { collection,doc,updateDoc,getDoc,addDoc, query, where, getDocs } from 'firebase/firestore';
import Displaypaid from './Displaypaid';
function payment() {
    const [studentId, setStudentId]=useState("")
    const [paid, setPaid]=useState("")
    const [date, setDate]=useState("")

    const pay=async ()=>{
        if(!studentId || !paid ){
            alert('there is no student with this id')
            return;
        }

        try{
            const studentQury = query(
                    collection(db, "students"),
                    where("id", "==", parseInt(studentId))
                  )
            const studentSanpShort = await getDocs(studentQury)
            if (studentSanpShort.empty) {
                alert('there is no student on this id')
                return;
            }
            // console.log(studentSanpShort)
            const studentDoc = studentSanpShort.docs[0]
            const studentRef = doc(db, "students", studentDoc.id);
            const currentPayed = studentDoc.data().paid || 0

            await addDoc(collection(db, 'payment'),{
                studentId: parseInt(studentId),
                paid:parseInt(paid),
                date
            })
            const newpaymetamount =currentPayed+parseInt(paid)
            await updateDoc(studentRef,{
                paid:newpaymetamount
            })
            alert('payment sucsuusful')
            setStudentId("")
            setPaid("")
            setDate("")
        }catch(error){
            console.error('some err in payment',error)
        }
    }
  return (
    <div>
        <h2 className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">ADD PAYMENTS</h2>
        <div className="max-w-sm mx-auto">
            <div className='mb-4 mt-7'>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="">student id</label>
            <input
             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             type="number"
             placeholder="Enter Student ID"
            value={studentId}
             onChange={(e)=> setStudentId(e.target.value)}
             />
            </div>
            <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date:</label>
        <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="date"
          placeholder="date of the paymetn"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        </div>
            <div className='mb-4 mt-7'>
             <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="">pay amount</label>
            <input
             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             type="number"
             placeholder="Enter amout top pay"
             value={paid}
             onChange={(e)=> setPaid(e.target.value)}
             />
            </div>
             <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={pay}>Pay Amount</button>
        </div>
        <Displaypaid/>
    </div>
  )
}

export default payment