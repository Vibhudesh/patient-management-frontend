export interface Patient {
  id: string;
  name: string;
  email: string;
  address: string;
  dateOfBirth: string;
  registeredDate: string;
}

export interface PatientRequest {
  name: string;
  email: string;
  address: string;
  dateOfBirth: string;
  registeredDate: string;
}

export interface PatientResponse {
  id: string;
  name: string;
  email: string;
  address: string;
  dataOfBirth: string; // Note: backend has a typo in the field name
} 