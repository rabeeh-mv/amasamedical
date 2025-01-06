import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

function Hospitals() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [hospitals, setHospitals] = useState([]);
  var [hinds, sethinds] = useState("");
  const [editedHospital, seteditedHospital] = useState(null);

  const addHospital = async () => {
    if (!name) {
      alert("please enter hoospitalname");
      return;
    }
    try {
      addDoc(collection(db, "hospitals"), {
        name: name,
        number: number,
      });
      sethinds("you ad a hospital");
      setName("");
      setNumber("");
    } catch (error) {
      console.error("err ", error);
    }
  };

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
  };
  // delete hospitals
  const deletHospital = async (docId) => {
    console.log(docId);
    try {
      await deleteDoc(doc(db, "hospitals", docId));
      alert("hospitals deleted successfully");
      //   fetchhospital()
    } catch (error) {
      console.error("Error deleting hospitals:", error);
    }
  };

  // edit
  const editHospital = async (hospital) => {
    seteditedHospital(hospital);
    console.log(hospital);
  };

  const updateHospital = async () => {
    if (!editedHospital) return;
    try {
      const shospitaltRef = doc(db, "hospitals", editedHospital.id);
      await updateDoc(shospitaltRef, {
        name,
        number,
      });
      hinds = "hospital updated successfully";
      resetForm();
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };
  const resetForm = () => {
    setName("");
    setNumber("");
    seteditedHospital(null);
  };
  useEffect(() => {
    if (editedHospital) {
      setName(editedHospital.name);
      setNumber(editedHospital.number);
    }
  }, [editedHospital]);

  useEffect(() => {
    fetchhospital();
  }, [addHospital]);

  // console.log(hospitals)
  return (
      <div>
      <h2 className="block mb-2 text-xl text-center font-medium text-gray-900 dark:text-white">ADD HOSPITALS</h2>
        <div className="max-w-sm mx-auto">
          <div className="mb-4 mt-7">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="name">Name Of Hospital</label>
            <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              placeholder="Hospital name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="name">Mobial number</label>
            <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              placeholder="phone number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={editedHospital ? updateHospital : addHospital}>
              {editedHospital ? "Update hospital" : "add hospital"}
            </button>
            {editedHospital && <button className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={resetForm}>cancel</button>}
          </div>
        </div>
        <div className="grid place-content-center mt-7">
          <h3 className="text-center p-4">Added Hospitals</h3>
            <div className="w-96 m-2 max-w-sm p-6 bg-white border center border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            {hospitals.map((hospital, index) => (
              <div className="" key={index}>
                <h2 className=" text-md font-semibold tracking-tight text-gray-900 dark:text-white">Name : {hospital.name} </h2>
                <h4 className=" text-md tracking-tight text-gray-900 dark:text-white">number : {hospital.number} </h4>
                <button className="font-medium mr-4 text-blue-600 dark:text-blue-500 hover:underline" onClick={() => editHospital(hospital)}> edit </button>
                <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => deletHospital(hospital.id)}>
                  {" "}
                  delete{" "}
                </button>
                <hr className="m-2"/>
              </div>
            ))}
            </div>
        </div>
      </div>

  );
}

export default Hospitals;
