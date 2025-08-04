import { useState, useEffect } from 'react';
import PatientList from './components/PatientList';
import PatientForm from './components/PatientForm';
import Login from './components/Login';
import authService from './services/authService';
import patientService from './services/patientService';
import type { Patient, PatientRequest } from './types/Patient';
import type { AuthState } from './types/Auth';
import './App.css';

function App() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    loading: true,
    error: null
  });

  const [currentView, setCurrentView] = useState<'list' | 'add' | 'edit'>('list');
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check authentication status on component mount
  useEffect(() => {
    const token = authService.getToken();
    const user = authService.getUser();
    
    if (token && user) {
      setAuthState({
        isAuthenticated: true,
        user,
        token,
        loading: false,
        error: null
      });
    } else {
      setAuthState({
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
        error: null
      });
    }
  }, []);

  const handleLoginSuccess = () => {
    const token = authService.getToken();
    const user = authService.getUser();
    
    setAuthState({
      isAuthenticated: true,
      user,
      token,
      loading: false,
      error: null
    });
  };

  const handleLogout = () => {
    authService.logout();
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false,
      error: null
    });
    setCurrentView('list');
    setEditingPatient(null);
    setError(null);
  };

  const handleAddPatient = () => {
    setEditingPatient(null);
    setCurrentView('add');
    setError(null);
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setCurrentView('edit');
    setError(null);
  };

  const handleCancel = () => {
    setCurrentView('list');
    setEditingPatient(null);
    setError(null);
  };

  const handleSubmit = async (patientData: PatientRequest) => {
    setLoading(true);
    setError(null);

    try {
      if (editingPatient) {
        // Update existing patient
        await patientService.updatePatient(editingPatient.id, patientData);
      } else {
        // Create new patient
        await patientService.createPatient(patientData);
      }
      
      setCurrentView('list');
      setEditingPatient(null);
    } catch (err) {
      setError('Failed to save patient. Please try again.');
      console.error('Error saving patient:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await patientService.deletePatient(id);
      // The PatientList component will handle the UI update
    } catch (err) {
      setError('Failed to delete patient. Please try again.');
      console.error('Error deleting patient:', err);
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'list':
        return (
          <PatientList 
            onEdit={handleEditPatient}
            onDelete={handleDelete}
          />
        );
      case 'add':
        return (
          <PatientForm 
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={loading}
          />
        );
      case 'edit':
        return (
          <PatientForm 
            patient={editingPatient}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={loading}
          />
        );
      default:
        return (
          <PatientList 
            onEdit={handleEditPatient}
            onDelete={handleDelete}
          />
        );
    }
  };

  // Show loading screen while checking authentication
  if (authState.loading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!authState.isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // Show main application if authenticated
  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>Patient Management System</h1>
          <div className="header-right">
            <nav className="nav-buttons">
              <button 
                className={`nav-btn ${currentView === 'list' ? 'active' : ''}`}
                onClick={() => setCurrentView('list')}
              >
                Patient List
              </button>
              <button 
                className={`nav-btn ${currentView === 'add' ? 'active' : ''}`}
                onClick={handleAddPatient}
              >
                Add Patient
              </button>
            </nav>
            <div className="user-info">
              <span className="user-name">Welcome, {authState.user?.name}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="app-main">
        {error && (
          <div className="global-error">
            <p>{error}</p>
            <button onClick={() => setError(null)}>Dismiss</button>
          </div>
        )}

        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;
