import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { MyProjectsPage } from './pages/MyProjectsPage/MyProjectsPage';
import { TemplateEditor } from './components/TemplateEditor/TemplateEditor';
import { SavedProject } from './types/schema';
import theme from './theme';

function AppContent() {
  const navigate = useNavigate();

  const handleNavigateToEditor = (project?: SavedProject) => {
    if (project) {
      // Store the project data to be loaded by the editor
      sessionStorage.setItem('projectToLoad', JSON.stringify(project));
    }
    navigate('/');
  };

  const handleNavigateToProjects = () => {
    navigate('/projects');
  };

  const handleNavigateBack = () => {
    navigate('/');
  };

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <TemplateEditor 
            onNavigateToProjects={handleNavigateToProjects}
          />
        } 
      />
      <Route 
        path="/projects" 
        element={
          <MyProjectsPage 
            onNavigateToEditor={handleNavigateToEditor}
            onNavigateBack={handleNavigateBack}
          />
        } 
      />
    </Routes>
  );
}

function App() {
  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <div style={{ height: '100vh', overflow: 'hidden' }}>
          <AppContent />
        </div>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;