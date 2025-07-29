import { useState, useEffect } from 'react';
import { Stack, Group, Title, Divider, ActionIcon, Tooltip, Text } from '@mantine/core';
import { ChevronDown, ChevronUp, Copy, Check, Maximize, Download } from 'lucide-react';
import { ControlPanel, useCopyStyles } from '../ControlPanel/ControlPanel';
import { CodeSection } from './CodeSection';
import { FullViewModal } from './FullViewModal';
import { useAppSelector } from '../../hooks/redux';
import { createZipAndDownload } from '../../utils/zipUtils';

interface RightSidebarProps {
  grapesEditor: any;
}

export function RightSidebar({ grapesEditor }: RightSidebarProps) {
  const [selectedElement, setSelectedElement] = useState<any>(null);
  const [stylesOpen, setStylesOpen] = useState(true);
  const [codeOpen, setCodeOpen] = useState(false);
  const [fullViewOpen, setFullViewOpen] = useState(false);
  const [displaySectionExpanded, setDisplaySectionExpanded] = useState(false);
  const { editorContent, selectedTemplate, fullHtml, templates } = useAppSelector((state) => state.template);
  const { copied, handleCopyStyles } = useCopyStyles(selectedElement);

  // Expand display section when an element is selected
  useEffect(() => {
    if (selectedElement && !displaySectionExpanded) {
      console.log('Element selected, expanding display section');
      setDisplaySectionExpanded(true);
    }
  }, [selectedElement, displaySectionExpanded]);

  useEffect(() => {
    if (!grapesEditor) return;

    const handleSelection = () => {
      try {
        const selected = grapesEditor.getSelected();
        console.log('=== ELEMENT SELECTION EVENT ===');
        console.log('Selected element from GrapesJS:', selected);
        console.log('Element methods available:', selected ? Object.getOwnPropertyNames(Object.getPrototypeOf(selected)) : 'none');
        console.log('Element properties:', selected ? Object.keys(selected) : 'none');
        setSelectedElement(selected);
      } catch (error) {
        console.error('Error getting selected element:', error);
      }
    };

    const handleDeselection = () => {
      setSelectedElement(null);
    };

    // Listen for component selection changes
    grapesEditor.on('component:selected', handleSelection);
    grapesEditor.on('component:deselected', handleDeselection);

    return () => {
      try {
        grapesEditor.off('component:selected', handleSelection);
        grapesEditor.off('component:deselected', handleDeselection);
      } catch (error) {
        console.error('Error removing event listeners:', error);
      }
    };
  }, [grapesEditor]);

  const handleStyleChange = (property: string, value: string) => {
    if (selectedElement && selectedElement.addStyle) {
      try {
        selectedElement.addStyle({ [property]: value });
        console.log(`Applied style: ${property}: ${value}`);
      } catch (error) {
        console.error('Error applying style:', error);
      }
    }
  };

  const handleDownload = async () => {
    // Use full HTML for download, but inject updated CSS and body content
    let htmlContent = fullHtml;
    
    if (!htmlContent) {
      // Fallback if no full HTML available
      htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Template</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
${editorContent.bodyContent}
</body>
</html>`;
    } else {
      // Replace body content and update styles in the full HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');
      
      // Update body content
      const body = doc.querySelector('body');
      if (body) {
        body.innerHTML = editorContent.bodyContent;
      }
      
      // Remove inline styles and add CSS link
      const existingStyles = doc.querySelectorAll('style');
      existingStyles.forEach(style => style.remove());
      
      // Add CSS link if not present
      let cssLink = doc.querySelector('link[rel="stylesheet"]');
      if (!cssLink) {
        cssLink = doc.createElement('link');
        cssLink.setAttribute('rel', 'stylesheet');
        cssLink.setAttribute('href', 'styles.css');
        doc.head.appendChild(cssLink);
      }
      
      htmlContent = '<!DOCTYPE html>\n' + doc.documentElement.outerHTML;
    }

    const files = [
      { name: 'index.html', content: htmlContent },
      { name: 'styles.css', content: editorContent.css }
    ];

    // Get the actual template name from the templates array
    const selectedTemplateData = templates.find(template => template.id === selectedTemplate);
    const templateName = selectedTemplateData?.name || 'web-template';
    
    // Create a clean folder name (remove special characters and spaces)
    const folderName = templateName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    
    await createZipAndDownload(files, folderName);
  };

  const handleFullView = () => {
    setFullViewOpen(true);
  };

  const isDisabled = !selectedElement;
  const isTemplateSelected = !!selectedTemplate;

  return (
    <Stack gap={0} h="100%">
      {/* Styles Panel Header */}
      <div style={{ borderBottom: '1px solid var(--mantine-color-gray-3)' }}>
        <div 
          style={{ padding: '16px 16px 0 16px', cursor: 'pointer' }}
          onClick={() => setStylesOpen(!stylesOpen)}
        >
          <Group justify="space-between" align="center" mb="md">
            <Text fz="md" fw={700} c="primary.6">
              Styles Panel
            </Text>
            <Group gap="xs">
              <Tooltip label={copied ? "Copied!" : "Copy CSS properties"} position="left">
                <ActionIcon
                  variant="subtle"
                  size="md"
                  onClick={handleCopyStyles}
                  disabled={isDisabled}
                  c={isDisabled ? 'gray' : copied ? 'green' : 'primary.6'}
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </ActionIcon>
              </Tooltip>
              <ActionIcon
                variant="subtle"
                size="md"
                onClick={(e) => {
                  e.stopPropagation();
                  setStylesOpen(!stylesOpen);
                }}
              >
                {stylesOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </ActionIcon>
            </Group>
          </Group>
        </div>
        <Divider />
      </div>

      {/* Styles Panel Content */}
      {stylesOpen && (
        <div style={{ flex: 1, overflow: 'auto' }}>
          <ControlPanel 
            selectedElement={selectedElement}
            onStyleChange={handleStyleChange}
            displaySectionExpanded={displaySectionExpanded}
          />
        </div>
      )}

      {/* Code Section */}
      <div style={{ borderTop: '1px solid var(--mantine-color-gray-3)' }}>
        <div style={{ padding: '16px 16px 0 16px' }}>
          <Group
            justify="space-between"
            mb="md"
            style={{ 
              cursor: 'pointer'
            }}
            onClick={() => setCodeOpen(!codeOpen)}
          >
            <Group gap="xs">
              <Text fz="md" fw={700} c="primary.6">
                Code
              </Text>
            </Group>
          <Group gap="xs">
            <Tooltip label="Full View" position="top">
              <ActionIcon
                variant="subtle"
                size="md"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFullView();
                }}
                disabled={!isTemplateSelected}
                c={!isTemplateSelected ? 'gray' : 'primary.6'}
              >
                <Maximize size={18} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Download Code" position="top">
              <ActionIcon
                variant="subtle"
                size="md"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload();
                }}
                disabled={!isTemplateSelected}
                c={!isTemplateSelected ? 'gray' : 'primary.6'}
              >
                <Download size={18} />
              </ActionIcon>
            </Tooltip>
            <ActionIcon variant="subtle" size="md" c="primary.6">
              {codeOpen ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
            </ActionIcon>
          </Group>
        </Group>
      </div>
      {codeOpen && <Divider />}
        
        {codeOpen && (
          <div style={{ maxHeight: '50vh', overflow: 'auto' }}>
            <CodeSection 
              onDownload={handleDownload}
              onFullView={handleFullView}
            />
          </div>
        )}
      </div>

      <FullViewModal
        opened={fullViewOpen}
        onClose={() => setFullViewOpen(false)}
        htmlContent={editorContent.bodyContent}
        cssContent={editorContent.css}
      />
    </Stack>
  );
}