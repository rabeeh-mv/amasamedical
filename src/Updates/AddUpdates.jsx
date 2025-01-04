import React, { useEffect, useState } from "react";
import { db } from "../firebase";
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
      <h2>Add Update</h2>
      <div>
        <label>Student ID:</label>
        <input
          type="number"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
      </div>
      <div>
        <label>Hospital:</label>
        <select
          value={hospitalId}
          onChange={(e) => setHospitalId(e.target.value)}
        >
          <option value="">Select Hospital</option>
          {hospitals.map((hospital) => (
            <option key={hospital.id} value={hospital.id}>
              {hospital.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Reason:</label>
        <input
          type="text"
          placeholder="Enter Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button onClick={addUpdate}>Add Update</button>
      <DisplayUpdates/>
    </div>
  );
}

export default AddUpdates;
