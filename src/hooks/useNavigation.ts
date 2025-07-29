import { useNavigate } from 'react-router-dom';
import { SavedProject } from '../types/schema';

/**
 * Custom hook for centralized navigation logic
 */
export function useNavigation() {
  const navigate = useNavigate();

  const navigateToBuilder = () => {
    navigate('/builder');
  };

  const navigateToProjects = () => {
    navigate('/projects');
  };

  const navigateToEditor = (project?: SavedProject) => {
    if (project) {
      // Store the project data to be loaded by the editor
      sessionStorage.setItem('projectToLoad', JSON.stringify(project));
    }
    navigate('/builder');
  };

  const navigateToProfile = () => {
    navigate('/profile');
  };

  const navigateToHome = () => {
    navigate('/');
  };

  const logout = () => {
    // Clear localStorage authentication data
    localStorage.removeItem('webbuilder_signin');
    // Navigate back to landing page
    navigate('/');
  };

  return {
    navigateToBuilder,
    navigateToProjects,
    navigateToEditor,
    navigateToProfile,
    navigateToHome,
    logout,
  };
}