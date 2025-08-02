import axios from 'axios';
import type { Patient, PatientRequest, PatientResponse } from '../types/Patient';

const API_BASE_URL = 'http://localhost:4000';

const patientService = {
  // Get all patients
  async getPatients(): Promise<Patient[]> {
    try {
      const response = await axios.get<PatientResponse[]>(`${API_BASE_URL}/patients`);
      return response.data.map(patient => ({
        id: patient.id,
        name: patient.name,
        email: patient.email,
        address: patient.address,
        dateOfBirth: patient.dataOfBirth, // Map the typo from backend
        registeredDate: new Date().toISOString().split('T')[0] // Default value since backend doesn't return it
      }));
    } catch (error) {
      console.error('Error fetching patients:', error);
      throw error;
    }
  },

  // Create a new patient
  async createPatient(patient: PatientRequest): Promise<Patient> {
    try {
      const response = await axios.post<PatientResponse>(`${API_BASE_URL}/patients`, patient);
      return {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        address: response.data.address,
        dateOfBirth: response.data.dataOfBirth,
        registeredDate: new Date().toISOString().split('T')[0]
      };
    } catch (error) {
      console.error('Error creating patient:', error);
      throw error;
    }
  },

  // Update a patient
  async updatePatient(id: string, patient: PatientRequest): Promise<Patient> {
    try {
      const response = await axios.put<PatientResponse>(`${API_BASE_URL}/patients/${id}`, patient);
      return {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        address: response.data.address,
        dateOfBirth: response.data.dataOfBirth,
        registeredDate: new Date().toISOString().split('T')[0]
      };
    } catch (error) {
      console.error('Error updating patient:', error);
      throw error;
    }
  },

  // Delete a patient
  async deletePatient(id: string): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/patients/${id}`);
    } catch (error) {
      console.error('Error deleting patient:', error);
      throw error;
    }
  }
};

export default patientService; 