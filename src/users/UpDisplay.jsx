import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

function DisplayUpdates() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUpdates = async () => {
    try {
      const updatesSnapshot = await getDocs(collection(db, "updates"));
      const updatesWithHospitalNames = [];

      for (const updateDoc of updatesSnapshot.docs) {
        const updateData = updateDoc.data();

        let hospitalName = "Unknown Hospital";
        if (updateData.hospitalId) {
          const hospitalRef = doc(db, "hospitals", updateData.hospitalId);
          const hospitalSnapshot = await getDoc(hospitalRef);

          if (hospitalSnapshot.exists()) {
            hospitalName = hospitalSnapshot.data().name;
          }
        }

        updatesWithHospitalNames.push({
          id: updateDoc.id,
          ...updateData,
          hospitalName,
        });
      }

      setUpdates(updatesWithHospitalNames);
    } catch (error) {
      console.error("Error fetching updates or hospitals:", error);
    } finally {
      setLoading(false);
    }
  };

  

  useEffect(() => {
    fetchUpdates();
  }, []);

  return (
    <div>
      <h2>Display Updates</h2>
      {loading ? (
        <p>Loading updates...</p>
      ) : updates.length > 0 ? (
        updates.map((update) => (
          <div key={update.id} className="update-item">
            <h4>Student ID: {update.studentId}</h4>
            <h4>Date: {update.date}</h4>
            <h4>Hospital: {update.hospitalName}</h4>
            <h4>Reason: {update.reason}</h4>
            <h4>Amount: {update.amount}</h4>

          </div>
        ))
      ) : (
        <p>No updates found.</p>
      )}
    </div>
  );
}

export default DisplayUpdates;
