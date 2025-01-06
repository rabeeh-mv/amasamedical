import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, } from "firebase/firestore";
import '../App.css'

function StdDisplay({Addstd,updateStd, setStudentToEdit }) {
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

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
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
    </tr>
  </thead>
  <tbody>
    {students
      .map((student, index) => (
        <tr key={student.id}>
          <td>{index + 1}</td> {/* Serial number */}
          <td>{student.id || 0}</td>
          <td>{student.name || "N/A"}</td>
          <td>{isNaN(student.amount) ? 0 : student.amount}</td>
          <td>{Math.max(0, student.amount-student.paid)}</td>
          <td>{isNaN(student.paid) ? 0 : student.paid}</td>
        </tr>
      ))}
  </tbody>
</table>

      )}
    </div>
  );
}

export default StdDisplay;
