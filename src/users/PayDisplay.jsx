import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,

} from "firebase/firestore";
import { db } from "../firebase";

function PayDisplay() {
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



 

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <>
      <div className="paycard">
        {payments.length > 0 ? (
          payments.map((pay) => (
            <div key={pay.docId} className="w-full border-2 p-4 text-sm m-1">
              <h4>Student ID: {pay.studentId}</h4>
              <h4>Paid Amount: {pay.paid}</h4>
            </div>
          ))
        ) : (
          <p>No payments found.</p>
        )}
      </div>
    </>
  );
}

export default PayDisplay;
