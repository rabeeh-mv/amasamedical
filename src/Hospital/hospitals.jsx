import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection ,addDoc,getDocs ,deleteDoc ,doc , updateDoc} from 'firebase/firestore'
import './hospital.css'

function Hospitals() {
    const [name, setName]=useState("")
    const [number, setNumber]=useState("")
    const [hospitals , setHospitals]= useState([])
    var [hinds, sethinds]=useState("")
    const [editedHospital, seteditedHospital]= useState(null)

    const addHospital = async ()=>{
        try{
            addDoc(collection(db,"hospitals"),{
                name:name,
                number:number
            })
            sethinds('you ad a hospital')
            setName("")
            setNumber("")
        }catch (error){
            console.error("err ",error)
        }
    }

    const fetchhospital = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "hospitals"));
            const hospitalList = [];
            querySnapshot.forEach((doc) => {
                hospitalList.push({ id: doc.id, ...doc.data() });
            });
            setHospitals(hospitalList); // Set the students state
        } catch (error) {
            console.error("Error fetching hospital: ", error);
        }
    }
// delete hospitals
const deletHospital = async (docId) => {
    console.log(docId)
    try {
      await deleteDoc(doc(db, "hospitals", docId));
      alert("hospitals deleted successfully");
    //   fetchhospital()
    } catch (error) {
      console.error("Error deleting hospitals:", error);
    }
  };

  // edit
  const editHospital = async (hospital)=>{
    seteditedHospital(hospital)
    console.log(hospital)
  }

  const updateHospital = async () => {
      if (!editedHospital) return;
      try {
        const shospitaltRef = doc(db, "hospitals", editedHospital.id);
        await updateDoc(shospitaltRef, {
          name,
          number
        });
        hinds= "hospital updated successfully"
        resetForm();
      } catch (error) {
        console.error("Error updating student:", error);
      }
    };
    const resetForm = ()=>{
        setName("")
        setNumber("")
        seteditedHospital(null)
    }
    useEffect(()=>{
       if (editedHospital) {
        setName(editedHospital.name)
        setNumber(editedHospital.number)
       }
    },[editedHospital])

    useEffect(()=>{
        fetchhospital()
    },[addHospital])

    // console.log(hospitals)
  return (
    <>
    {hinds}
    Add hospitals
    <div className="hospital">
        <div className="wrapper-add">
            <div className="addbox">
                <label htmlFor="name">Name Of Hospital</label><br />
                <input 
                type="text" 
                value={name}
                onChange={(e)=>setName(e.target.value)}
                /><br/>
                <label htmlFor="name">mobial number</label><br />
                <input 
                type="text" 
                value={number}
                onChange={(e)=>setNumber(e.target.value)}
                />
                <div className="btn">
                    <button onClick={editedHospital ? updateHospital : addHospital}>
                        {editedHospital ? 'Update hospital' : 'add hospital'}
                    </button>
                    {editedHospital && (
                        <button onClick={resetForm}>cancel</button>
                    )}
                </div>
            </div>
        </div>
        <div className="wrapper-view">
            <h3>added Hospitals</h3>
            <ul>
                {hospitals.map((hospital, index)=>(
                    <div className='hpital-box' key={index}>{index+1 }
                       <h2>Name : {hospital.name} </h2>  
                        <h4>number : {hospital.number} </h4> 
                        <button onClick={()=>editHospital(hospital)}> edit </button> 
                        <button onClick={()=>deletHospital(hospital.id)}> delete </button>
                    </div>
                ))}
            </ul>
        </div>
    </div>
    </>
  )
}

export default Hospitals