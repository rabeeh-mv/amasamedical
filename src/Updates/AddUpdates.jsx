import React, { useEffect, useState } from "react";
import { db } from "../firebase";
// import '../index.css'

import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import DisplayUpdates from "./DisplayUpdates";

function AddUpdates() {
  const [studentId, setStudentId] = useState(""); // Manually entered Student ID
  const [hospitalId, setHospitalId] = useState("");
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [hospitals, setHospitals] = useState([]);

  // Fetch hospitals from Firestore
  const fetchHospitals = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "hospitals"));
      const hospitalList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHospitals(hospitalList);
    } catch (error) {
      console.error("Error fetching hospitals: ", error);
    }
  };

  // Add update to Firestore
  const addUpdate = async () => {
    if (!studentId || !hospitalId || !reason || !date || !amount) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      // Verify the student exists by 'id'
      const studentQuery = query(
        collection(db, "students"),
        where("id", "==", parseInt(studentId))
      );
      const studentSnapshot = await getDocs(studentQuery);

      if (studentSnapshot.empty) {
        alert("Student not found!");
        return;
      }

      // Get the student's current data
      const studentDoc = studentSnapshot.docs[0];
      const studentRef = doc(db, "students", studentDoc.id);
      const currentAmount = studentDoc.data().amount || 0; // Default to 0 if amount is not set

      // Add the update record to the "updates" collection
      await addDoc(collection(db, "updates"), {
        studentId: parseInt(studentId),
        hospitalId,
        reason,
        date,
        amount: parseInt(amount),
      });

      // Update the student's amount in the "students" collection
      const newTotalAmount = currentAmount + parseInt(amount);
      await updateDoc(studentRef, {
        amount: newTotalAmount,
      });

      alert("Update added successfully!");
      setStudentId("");
      setHospitalId("");
      setReason("");
      setDate("");
      setAmount("");
    } catch (error) {
      console.error("Error adding update: ", error);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  return (
    <div>
      <h2 className="block mb-2 text-center text-xl font-medium text-gray-900 dark:text-white">ADD UPDATES</h2>
      <div className="max-w-sm mx-auto">
      <div className="mb-4 mt-7">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student ID:</label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="number"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
      </div>
      <div className="mb-5 relative">
        <label className=" text-sm font-medium text-gray-900 dark:text-white" >Hospital:</label>
        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 end-0 absolute p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={hospitalId}
          onChange={(e) => setHospitalId(e.target.value)}
        >
          <option className="py-2 text-sm text-gray-700 dark:text-gray-200" value="">Select Hospital</option>
          {hospitals.map((hospital) => (
            <option className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" key={hospital.id} value={hospital.id}>
              {hospital.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label>Reason:</label>
        <textarea 
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          placeholder="Enter Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label>Date:</label>
        <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount:</label>
        <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={addUpdate}>Add Update</button>
      </div>
      <DisplayUpdates/>

    </div>
  );
}

export default AddUpdates;
