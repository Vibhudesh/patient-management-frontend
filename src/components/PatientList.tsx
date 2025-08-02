import React, { useState, useEffect } from 'react';
import type { Patient } from '../types/Patient';
import patientService from '../services/patientService';
import './PatientList.css';

interface PatientListProps {
  onEdit: (patient: Patient) => void;
  onDelete: (id: string) => void;
}

const PatientList: React.FC<PatientListProps> = ({ onEdit, onDelete }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const data = await patientService.getPatients();
      setPatients(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch patients. Please try again.');
      console.error('Error fetching patients:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await patientService.deletePatient(id);
        setPatients(patients.filter(patient => patient.id !== id));
      } catch (err) {
        setError('Failed to delete patient. Please try again.');
        console.error('Error deleting patient:', err);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading patients...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={fetchPatients}>Retry</button>
      </div>
    );
  }

  return (
    <div className="patient-list">
      <h2>Patient List</h2>
      {patients.length === 0 ? (
        <p className="no-patients">No patients found. Add a new patient to get started.</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Date of Birth</th>
                <th>Registered Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.name}</td>
                  <td>{patient.email}</td>
                  <td>{patient.address}</td>
                  <td>{new Date(patient.dateOfBirth).toLocaleDateString()}</td>
                  <td>{new Date(patient.registeredDate).toLocaleDateString()}</td>
                  <td>
                    <button 
                      className="edit-btn"
                      onClick={() => onEdit(patient)}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(patient.id)}
                    >
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
};

export default PatientList; 