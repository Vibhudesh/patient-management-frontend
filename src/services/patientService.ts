import logger from '../utils/logger';
import api from './api';
import type { Patient, PatientRequest, PatientResponse } from '../types/Patient';

const patientService = {
  // Get all patients
  async getPatients(): Promise<Patient[]> {
    try {
      logger.info('Requesting all patients...');
      const response = await api.get<PatientResponse[]>('/patients');
      logger.info('Received patients:', response.data);
      return response.data.map(patient => ({
        id: patient.id,
        name: patient.name,
        email: patient.email,
        address: patient.address,
        dateOfBirth: patient.dataOfBirth, // Map the typo from backend
        registeredDate: new Date().toISOString().split('T')[0] // Default value since backend doesn't return it
      }));
    } catch (error) {
      logger.error('Error fetching patients:', error);
      throw error;
    }
  },

  // Create a new patient
  async createPatient(patient: PatientRequest): Promise<Patient> {
    try {
      logger.info('Creating patient:', patient);
      const response = await api.post<PatientResponse>('/patients', patient);
      logger.info('Patient created:', response.data);
      return {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        address: response.data.address,
        dateOfBirth: response.data.dataOfBirth,
        registeredDate: new Date().toISOString().split('T')[0]
      };
    } catch (error) {
      logger.error('Error creating patient:', error);
      throw error;
    }
  },

  // Update a patient
  async updatePatient(id: string, patient: PatientRequest): Promise<Patient> {
    try {
      logger.info('Updating patient:', id, patient);
      const response = await api.put<PatientResponse>(`/patients/${id}`, patient);
      logger.info('Patient updated:', response.data);
      return {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        address: response.data.address,
        dateOfBirth: response.data.dataOfBirth,
        registeredDate: new Date().toISOString().split('T')[0]
      };
    } catch (error) {
      logger.error('Error updating patient:', error);
      throw error;
    }
  },

  // Delete a patient
  async deletePatient(id: string): Promise<void> {
    try {
      logger.info('Deleting patient:', id);
      await api.delete(`/patients/${id}`);
      logger.info('Patient deleted:', id);
    } catch (error) {
      logger.error('Error deleting patient:', error);
      throw error;
    }
  }
};

export default patientService; 