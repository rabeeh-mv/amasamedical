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
      <div className="  text-center text-md mb-2 mt-4">Display Paid</div>
      <div className="flex flex-col items-center content-center h-96 overflow-scroll bg-gray-200 p-4">
        {payments.length > 0 ? (
          payments.map((pay) => (
           <div key={pay.docId} className=" m-1 w-5/12 p-3 bg-white border center border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-row items-center justify-between">
              <div className="">
                <h4 className="text-md tracking-tight text-gray-800 dark:text-white">Student ID: {pay.studentId}</h4>
              <h4 className="text-sm tracking-tight text-gray-800 dark:text-white">Date : {pay.date}</h4>
                </div>
                <div className="flex">
              <h4 className="mr-4 tracking-tight text-gray-900 dark:text-white ">Paid Amount : <span className="text-bold text-3xl"> ₹{pay.paid}</span> </h4>
            <button className="px-2 font-medium text-blue-600 dark:text-blue-500 hover:text-red-200 hover:underline" onClick={() => deletePayment(pay.docId)}>Delete</button>
                </div>
           </div>
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
