import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { Paper } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { updateEditorContent } from '../../store/templateStore';
import { EmptyState } from './EmptyState';

declare global {
  interface Window {
    grapesjs: any;
  }
}

export interface EditorPanelRef {
  getEditor: () => any;
}

interface EditorPanelProps {
  onSelectTemplate?: () => void;
  onProjectLoad?: (project: any) => void;
}

export const EditorPanel = forwardRef<EditorPanelRef, EditorPanelProps>(({ onSelectTemplate, onProjectLoad }, ref) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const grapesEditorRef = useRef<any>(null);
  const [isGrapesJSLoaded, setIsGrapesJSLoaded] = useState(false);
  const { selectedTemplate, editorContent } = useAppSelector((state) => state.template);
  const dispatch = useAppDispatch();

  const handleProjectLoad = (project: any) => {
    // Load the project content into the editor
    dispatch(updateEditorContent({ 
      html: project.html, 
      bodyContent: project.html, 
      css: project.css 
    }));
    
    // Set a dummy template ID to trigger editor initialization
    dispatch({ type: 'template/selectTemplate', payload: 'saved-project' });
    
    // Notify parent component about project load
    if (onProjectLoad) {
      onProjectLoad(project);
    }
  };

  useImperativeHandle(ref, () => ({
    getEditor: () => grapesEditorRef.current
  }));

  // Load GrapesJS dynamically
  useEffect(() => {
    const loadGrapesJS = async () => {
      if (window.grapesjs) {
        setIsGrapesJSLoaded(true);
        return;
      }

      try {
        // Load CSS first
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'https://unpkg.com/grapesjs@0.21.7/dist/css/grapes.min.css';
        document.head.appendChild(cssLink);

        // Load JS
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/grapesjs@0.21.7/dist/grapes.min.js';
        script.onload = () => {
          setIsGrapesJSLoaded(true);
        };
        script.onerror = () => {
          console.error('Failed to load GrapesJS');
        };
        document.head.appendChild(script);
      } catch (error) {
        console.error('Error loading GrapesJS:', error);
      }
    };

    loadGrapesJS();
  }, []);

  // Initialize GrapesJS editor
  useEffect(() => {
    if (!editorRef.current || !isGrapesJSLoaded) return;
    if (!selectedTemplate && !editorContent.bodyContent) return;

    // Only initialize if we don't have an editor instance
    if (grapesEditorRef.current) {
      return;
    }

    try {
      grapesEditorRef.current = window.grapesjs.init({
        container: editorRef.current,
        height: '100%',
        width: '100%',
        storageManager: false,
        fromElement: false,
        showOffsets: true,
        assetManager: {
          embedAsBase64: true,
        },
        canvas: {
          styles: [
            'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
          ]
        },
        blockManager: {
          appendTo: '#blocks',
          blocks: [
            {
              id: 'section',
              label: '<b>Section</b>',
              attributes: { class: 'gjs-block-section' },
              content: `<section>
                <h1>Insert title here</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </section>`
            },
            {
              id: 'text',
              label: 'Text',
              content: '<div data-gjs-type="text">Insert your text here</div>',
            },
            {
              id: 'image',
              label: 'Image',
              select: true,
              content: { type: 'image' },
              activate: true,
            }
          ]
        },
        layerManager: {
          appendTo: '#layers'
        },
        panels: {
          defaults: []
        },
        deviceManager: {
          devices: [
            {
              name: 'Desktop',
              width: '',
            },
            {
              name: 'Mobile',
              width: '320px',
              widthMedia: '480px',
            }
          ]
        }
      });

      // Set initial content (use bodyContent for editing)
      if (editorContent.bodyContent) {
        grapesEditorRef.current.setComponents(editorContent.bodyContent);
      }
      if (editorContent.css) {
        grapesEditorRef.current.setStyle(editorContent.css);
      }

      // Listen for content changes
      grapesEditorRef.current.on('component:update', () => {
        const bodyContent = grapesEditorRef.current.getHtml();
        const css = grapesEditorRef.current.getCss();
        dispatch(updateEditorContent({ html: bodyContent, bodyContent, css }));
      });

      grapesEditorRef.current.on('style:update', () => {
        const bodyContent = grapesEditorRef.current.getHtml();
        const css = grapesEditorRef.current.getCss();
        dispatch(updateEditorContent({ html: bodyContent, bodyContent, css }));
      });

    } catch (error) {
      console.error('Error initializing GrapesJS:', error);
    }

    return () => {
      // Only destroy when component unmounts, not on every dependency change
    };
  }, [selectedTemplate, isGrapesJSLoaded, dispatch]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (grapesEditorRef.current) {
        try {
          grapesEditorRef.current.destroy();
        } catch (error) {
          console.error('Error destroying GrapesJS:', error);
        }
        grapesEditorRef.current = null;
      }
    };
  }, []);

  // Update editor content when new template content is loaded
  useEffect(() => {
    if (grapesEditorRef.current && editorContent.bodyContent && editorContent.css) {
      try {
        // Only update if content has actually changed
        const currentHtml = grapesEditorRef.current.getHtml();
        const currentCss = grapesEditorRef.current.getCss();
        
        if (currentHtml !== editorContent.bodyContent) {
          grapesEditorRef.current.setComponents(editorContent.bodyContent);
        }
        if (currentCss !== editorContent.css) {
          grapesEditorRef.current.setStyle(editorContent.css);
        }
      } catch (error) {
        console.error('Error updating editor content:', error);
      }
    }
  }, [editorContent.bodyContent, editorContent.css]);

  if (!selectedTemplate && !editorContent.bodyContent) {
    return (
      <Paper h="100%" withBorder>
        <EmptyState onSelectTemplate={onSelectTemplate} onProjectLoad={handleProjectLoad} />
      </Paper>
    );
  }

  if (!isGrapesJSLoaded) {
    return (
      <Paper h="100%" withBorder>
        <EmptyState />
      </Paper>
    );
  }

  return (
    <Paper h="100%" withBorder style={{ position: 'relative', overflow: 'hidden' }}>
      <div
        ref={editorRef}
        style={{
          height: '100%',
          width: '100%'
        }}
      />
      
      {/* Hidden containers for GrapesJS panels */}
      <div id="blocks" style={{ display: 'none' }} />
      <div id="layers" style={{ display: 'none' }} />
      <div className="panel__right" style={{ display: 'none' }} />
      <div className="panel__switcher" style={{ display: 'none' }} />
    </Paper>
  );
});

EditorPanel.displayName = 'EditorPanel';