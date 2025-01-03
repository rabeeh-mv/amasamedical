import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Firestore config
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import DisplayStd from "./Dispalystd";
import "./Addstd.css";

function Addstd() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [paid, setPaid] = useState("");
  const [studentToEdit, setStudentToEdit] = useState(null);
  var hinds
  const addStd = async () => {
    if (!name || !id) {
      alert("Please enter ID and Name");
      return;
    }
    try {
      await addDoc(collection(db, "students"), {
        id: isNaN(parseInt(id)) ? 0 : parseInt(id),
        name,
        amount: isNaN(parseInt(amount)) ? 0 : parseInt(amount),
        paid: isNaN(parseInt(paid)) ? 0 : parseInt(paid),
      });
      hinds ="Student added successfully"
      resetForm();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };
  
  const updateStd = async () => {
    if (!studentToEdit) return;
    try {
      const studentRef = doc(db, "students", studentToEdit.docId);
      await updateDoc(studentRef, {
        id: isNaN(parseInt(id)) ? 0 : parseInt(id),
        name,
        amount: isNaN(parseInt(amount)) ? 0 : parseInt(amount),
        paid: isNaN(parseInt(paid)) ? 0 : parseInt(paid),
      });
      alert("Student updated successfully");
      resetForm();
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };
  

  const resetForm = () => {
    setId("");
    setName("");
    setAmount("");
    setPaid("");
    setStudentToEdit(null);
  };

  useEffect(() => {
    if (studentToEdit) {
      setId(studentToEdit.id); // Custom ID
      setName(studentToEdit.name);
      setAmount(studentToEdit.amount);
      setPaid(studentToEdit.paid);
    }
  }, [studentToEdit]);


  return (
    <>
      <div className="addst">
        
        <h2>{studentToEdit ? "Edit Student" : "Add Student"}</h2>
        <div className="form">
          <label htmlFor="id">Student ID</label>
          <input
            type="number"
            placeholder="Student ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            disabled={!!studentToEdit}
          />
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            placeholder="Total Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <label htmlFor="paid">Paid</label>
          <input
            type="number"
            placeholder="Paid Amount"
            value={paid}
            onChange={(e) => setPaid(e.target.value)}
          />
          <div className="submit">
            <button onClick={studentToEdit ? updateStd : addStd}>
              {studentToEdit ? "Update Student" : "Add Student"}
            </button>
            {studentToEdit && (
              <button onClick={resetForm}>Cancel</button>
            )}
          </div>
        </div>
      </div>
      <DisplayStd Addstd={Addstd} updateStd={updateStd} setStudentToEdit={setStudentToEdit} />
    </>
  );
}

export default Addstd;
