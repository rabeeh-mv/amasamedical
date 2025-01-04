import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

function DisplayStd({Addstd,updateStd, setStudentToEdit }) {
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
  }, [Addstd,updateStd,deleteStudent]);

  return (
    <div>
      <h2>Students List</h2>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table>
  <thead>
    <tr>
      <th>#</th> {/* Serial number */}
      <th>StdId</th>
      <th>Name</th>
      <th>Amount</th>
      <th>Payable</th>
      <th>Paid</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {students
      .sort((a, b) => a.id - b.id) // Sort by 'id' in ascending order (optional)
      .map((student, index) => (
        <tr key={student.id}>
          <td>{index + 1}</td> {/* Serial number */}
          <td>{student.id || 0}</td>
          <td>{student.name || "N/A"}</td>
          <td>{isNaN(student.amount) ? 0 : student.amount}</td>
          <td>{Math.max(0, student.amount-student.paid)}</td>
          <td>{isNaN(student.paid) ? 0 : student.paid}</td>
          <td>
            <button onClick={() => editStudent(student)}>Edit</button>
            <button onClick={() => deleteStudent(student.docId)}> Delete</button>
          </td>
        </tr>
      ))}
  </tbody>
</table>

      )}
    </div>
  );
}

export default DisplayStd;
