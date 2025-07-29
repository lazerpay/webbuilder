import { useReducer, useMemo } from 'react';

interface TemplateEditorState {
  projectName: string;
  newProjectModalOpen: boolean;
  saveProjectModalOpen: boolean;
  existingProjectDetected: boolean;
  sidebarOpen: boolean;
  grapesEditor: any;
}

type TemplateEditorAction =
  | { type: 'SET_PROJECT_NAME'; payload: string }
  | { type: 'SET_GRAPES_EDITOR'; payload: any }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'OPEN_SIDEBAR' }
  | { type: 'CLOSE_SIDEBAR' }
  | { type: 'OPEN_NEW_PROJECT_MODAL' }
  | { type: 'CLOSE_NEW_PROJECT_MODAL' }
  | { type: 'OPEN_SAVE_PROJECT_MODAL'; payload?: boolean }
  | { type: 'CLOSE_SAVE_PROJECT_MODAL' }
  | { type: 'RESET_STATE' };

const initialState: TemplateEditorState = {
  projectName: "Untitled Project",
  newProjectModalOpen: false,
  saveProjectModalOpen: false,
  existingProjectDetected: false,
  sidebarOpen: false,
  grapesEditor: null,
};

function templateEditorReducer(state: TemplateEditorState, action: TemplateEditorAction): TemplateEditorState {
  switch (action.type) {
    case 'SET_PROJECT_NAME':
      return { ...state, projectName: action.payload };
    
    case 'SET_GRAPES_EDITOR':
      return { ...state, grapesEditor: action.payload };
    
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };
    
    case 'OPEN_SIDEBAR':
      return { ...state, sidebarOpen: true };
    
    case 'CLOSE_SIDEBAR':
      return { ...state, sidebarOpen: false };
    
    case 'OPEN_NEW_PROJECT_MODAL':
      return { ...state, newProjectModalOpen: true };
    
    case 'CLOSE_NEW_PROJECT_MODAL':
      return { ...state, newProjectModalOpen: false };
    
    case 'OPEN_SAVE_PROJECT_MODAL':
      return { 
        ...state, 
        saveProjectModalOpen: true,
        existingProjectDetected: action.payload || false
      };
    
    case 'CLOSE_SAVE_PROJECT_MODAL':
      return { 
        ...state, 
        saveProjectModalOpen: false,
        existingProjectDetected: false
      };
    
    case 'RESET_STATE':
      return { ...initialState };
    
    default:
      return state;
  }
}

/**
 * Custom hook for managing TemplateEditor state with reducer
 */
export function useTemplateEditorState() {
  const [state, dispatch] = useReducer(templateEditorReducer, initialState);

  const actions = useMemo(() => ({
    setProjectName: (name: string) => dispatch({ type: 'SET_PROJECT_NAME', payload: name }),
    setGrapesEditor: (editor: any) => dispatch({ type: 'SET_GRAPES_EDITOR', payload: editor }),
    toggleSidebar: () => dispatch({ type: 'TOGGLE_SIDEBAR' }),
    openSidebar: () => dispatch({ type: 'OPEN_SIDEBAR' }),
    closeSidebar: () => dispatch({ type: 'CLOSE_SIDEBAR' }),
    openNewProjectModal: () => dispatch({ type: 'OPEN_NEW_PROJECT_MODAL' }),
    closeNewProjectModal: () => dispatch({ type: 'CLOSE_NEW_PROJECT_MODAL' }),
    openSaveProjectModal: (existingProject?: boolean) => 
      dispatch({ type: 'OPEN_SAVE_PROJECT_MODAL', payload: existingProject }),
    closeSaveProjectModal: () => dispatch({ type: 'CLOSE_SAVE_PROJECT_MODAL' }),
    resetState: () => dispatch({ type: 'RESET_STATE' }),
  }), []);

  return { state, actions };
}