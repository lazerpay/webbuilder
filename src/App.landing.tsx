import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage/LandingPage';
import { TemplateEditor } from './components/TemplateEditor/TemplateEditor';
import { MyProjectsPage } from './pages/MyProjectsPage/MyProjectsPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { SavedProject } from './types/schema';
import theme from './theme';

function AppContent() {
  const navigate = useNavigate();

  const handleNavigateToBuilder = () => {
    navigate('/builder');
  };

  const handleNavigateToProjects = () => {
    navigate('/projects');
  };

  const handleNavigateToEditor = (project?: SavedProject) => {
    if (project) {
      // Store the project data to be loaded by the editor
      sessionStorage.setItem('projectToLoad', JSON.stringify(project));
    }
    navigate('/builder');
  };

  const handleNavigateToProfile = () => {
    navigate('/profile');
  };

  const handleNavigateToHome = () => {
    navigate('/');
  };

  const handleLogout = () => {
    // Clear localStorage authentication data
    localStorage.removeItem('webbuilder_signin');
    // Navigate back to landing page
    navigate('/');
  };

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <LandingPage onNavigateToBuilder={handleNavigateToBuilder} />
        } 
      />
      <Route 
        path="/builder" 
        element={
          <ProtectedRoute>
            <TemplateEditor 
              onNavigateToProjects={handleNavigateToProjects}
              onNavigateToProfile={handleNavigateToProfile}
              onNavigateToHome={handleNavigateToHome}
              onLogout={handleLogout}
            />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/projects" 
        element={
          <ProtectedRoute>
            <MyProjectsPage 
              onNavigateToEditor={handleNavigateToEditor}
              onNavigateToProfile={handleNavigateToProfile}
              onNavigateToHome={handleNavigateToHome}
              onLogout={handleLogout}
            />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <ProfilePage 
              onNavigateToProjects={handleNavigateToProjects}
              onNavigateToHome={handleNavigateToHome}
              onLogout={handleLogout}
            />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

function App() {
  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <div style={{ minHeight: '100vh' }}>
          <AppContent />
        </div>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;