import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

function DisplayStd({ Addstd, updateStd, setStudentToEdit }) {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "students"));
      const studentsList = [];
      querySnapshot.forEach((doc) => {
        studentsList.push({ docId: doc.id, ...doc.data() }); // Include Firestore doc ID
      });
      setStudents(studentsList); 
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const deleteStudent = async (docId) => {
    try {
      await deleteDoc(doc(db, "students", docId));
      alert("Student deleted successfully");
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const editStudent = (student) => {
    setStudentToEdit(student);
  };

  useEffect(() => {
    fetchStudents();
  }, [Addstd, updateStd, deleteStudent]);

  return (
    <div>
      <h2>Students List</h2>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-3">#</th> {/* Serial number */}
              <th scope="col" className="px-2 py-2">StdId</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Amount</th>
              <th scope="col" className="px-6 py-3">Payable</th>
              <th scope="col" className="px-6 py-3">Paid</th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {students
              .sort((a, b) => a.id - b.id) // Sort by 'id' in ascending order (optional)
              .map((student, index) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={student.id}>
                  <td>{index + 1}</td> {/* Serial number */}
                  <td>{student.id || 0}</td>
                  <td>{student.name || "N/A"}</td>
                  <td>{isNaN(student.amount) ? 0 : student.amount}</td>
                  <td>{Math.max(0, student.amount - student.paid)}</td>
                  <td>{isNaN(student.paid) ? 0 : student.paid}</td>
                  <td >
                    <button className="font-medium m-2 text-blue-600 dark:text-blue-500 hover:underline" onClick={() => editStudent(student)}>Edit</button>
                    <button className="font-medium m-2 text-blue-600 dark:text-blue-500 hover:underline" onClick={() => deleteStudent(student.docId)}>
                      {" "}
                       Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
}

export default DisplayStd;
