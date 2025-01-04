import React, { useState } from 'react'
import { db } from "../firebase";
import { collection,doc,updateDoc,getDoc,addDoc, query, where, getDocs } from 'firebase/firestore';
import Displaypaid from './Displaypaid';
function payment() {
    const [studentId, setStudentId]=useState("")
    const [paid, setPaid]=useState("")

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
                paid:parseInt(paid)
            })
            const newpaymetamount =currentPayed+parseInt(paid)
            await updateDoc(studentRef,{
                paid:newpaymetamount
            })
            alert('payment sucsuusful')
            setStudentId("")
            setPaid("")
        }catch(error){
            console.error('some err in payment',error)
        }
    }
  return (
    <div>payment
        <div className="wrapper-payment">
            <label htmlFor="">student id</label>
            <input
             type="number"
            value={studentId}
             onChange={(e)=> setStudentId(e.target.value)}
             /><br/>
             <label htmlFor="">pay amount</label>
            <input
             type="number"
             value={paid}
             onChange={(e)=> setPaid(e.target.value)}
             />
             <button onClick={pay}>pay</button>
        </div>
        <Displaypaid/>
    </div>
  )
}

export default payment