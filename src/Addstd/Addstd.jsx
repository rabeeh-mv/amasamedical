import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Firestore config
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import DisplayStd from "./Dispalystd";

function Addstd() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [paid, setPaid] = useState("");
  const [studentToEdit, setStudentToEdit] = useState(null);
  var hinds;
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
      hinds = "Student added successfully";
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
      <h2 className="block mb-2 text-xl text-center font-medium text-gray-900 dark:text-white">
        {studentToEdit ? "EDIT STUDENTS" : "ADD STUDENTS"}
      </h2>
      <div className="max-w-sm mx-auto">
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="id">Student ID</label>
          <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="number"
            placeholder="Student ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            disabled={!!studentToEdit}
          />
        </div>
        <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="name">Name</label>
        <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        </div>
        <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="amount">Amount</label>
        <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="number"
          placeholder="Total Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        </div>
        <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="paid">Paid</label>
        <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="number"
          placeholder="Paid Amount"
          value={paid}
          onChange={(e) => setPaid(e.target.value)}
        />
        </div>
        <div className="mt-3 mb-5">
          <button className="mr-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={studentToEdit ? updateStd : addStd}>
            {studentToEdit ? "Update Student" : "Add Student"}
          </button>
          {studentToEdit && <button className=" text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={resetForm}>Cancel</button>}
        </div>
      </div>
      <DisplayStd
        Addstd={Addstd}
        updateStd={updateStd}
        setStudentToEdit={setStudentToEdit}
      />
    </>
  );
}

export default Addstd;
