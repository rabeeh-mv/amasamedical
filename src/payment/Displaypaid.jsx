import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

function Displaypaid() {
  const [payments, setPayments] = useState([]); // Initialize as an array

  // Fetch function to get data
  const fetchPayments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "payment"));
      const paymentList = [];
      querySnapshot.forEach((doc) => {
        paymentList.push({ docId: doc.id, ...doc.data() });
      });
      setPayments(paymentList);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  // Delete payment function with confirmation
  const deletePayment = async (docId) => {
    const confirmed = window.confirm("Are you sure you want to delete this payment?");
    if (!confirmed) {
      return; // Exit if the user cancels
    }

    try {
      // Fetch the payment record to retrieve its details
      const paymentRef = doc(db, "payment", docId);
      const paymentSnapshot = await getDoc(paymentRef);

      if (paymentSnapshot.exists()) {
        const payment = paymentSnapshot.data();

        // Fetch the student record based on studentId
        const studentQuery = query(
          collection(db, "students"),
          where("id", "==", payment.studentId)
        );
        const studentSnapshot = await getDocs(studentQuery);

        if (!studentSnapshot.empty) {
          const studentDoc = studentSnapshot.docs[0];
          const studentRef = doc(db, "students", studentDoc.id);
          const currentPaid = studentDoc.data().paid || 0;

          // Subtract the payment amount from the student's paid field
          const updatedPaid = Math.max(0, currentPaid - parseInt(payment.paid)); // Ensure it doesn't go below 0
          await updateDoc(studentRef, { paid: updatedPaid });
        }

        // Delete the payment record
        await deleteDoc(paymentRef);
        fetchPayments(); // Refresh the payment list
        // alert("Payment deleted successfully and student's paid field updated.");
      } else {
        alert("Payment record not found.");
      }
    } catch (error) {
      console.error("Error deleting payment:", error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <>
      <div>Display Paid</div>
      <div className="paycard">
        {payments.length > 0 ? (
          payments.map((pay) => (
            <div key={pay.docId} className="pay-item">
              <h4>Student ID: {pay.studentId}</h4>
              <h4>Paid Amount: {pay.paid}</h4>
              <button onClick={() => deletePayment(pay.docId)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No payments found.</p>
        )}
      </div>
    </>
  );
}

export default Displaypaid;
