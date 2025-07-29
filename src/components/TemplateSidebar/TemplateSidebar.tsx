import { Stack, Title, Text, ScrollArea, Loader, Alert } from '@mantine/core';
import { AlertCircle } from 'lucide-react';
import { useEffect } from 'react';
import { TemplateCard } from '../TemplateCard/TemplateCard';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { selectTemplate, fetchTemplates, fetchTemplateContent } from '../../store/templateStore';
import { Template } from '../../services/templateService';
import { projectService } from '../../services/projectService';

interface TemplateSidebarProps {
  onTemplateSelect?: () => void;
}

export function TemplateSidebar({ onTemplateSelect }: TemplateSidebarProps) {
  const { 
    templates, 
    selectedTemplate, 
    loading, 
    error, 
    templateContentLoading 
  } = useAppSelector((state) => state.template);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Fetch templates on component mount
    dispatch(fetchTemplates());
  }, [dispatch]);

  const handleSelectTemplate = async (template: Template) => {
    console.log('Selecting template:', template.name);
    dispatch(selectTemplate(template.id));
    
    // Fetch template content and store in sessionStorage
    try {
      const result = await dispatch(fetchTemplateContent(template));
      if (fetchTemplateContent.fulfilled.match(result)) {
        console.log('Template content loaded:', result.payload.content);
        // Store template as current project in sessionStorage
        projectService.setCurrentProjectFromTemplate(
          template.id,
          template.name,
          {
            html: result.payload.content.bodyContent,
            bodyContent: result.payload.content.bodyContent,
            css: result.payload.content.css
          }
        );
        console.log('Template stored in sessionStorage');
      }
    } catch (error) {
      console.error('Error loading template:', error);
    }
    
    // Close sidebar when template is selected
    if (onTemplateSelect) {
      onTemplateSelect();
    }
  };


  return (
    <div style={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Fixed Header */}
      <div style={{ padding: '16px', flexShrink: 0 }}>
        <Title order={3} size="h4" mb="xs" fw={700}>
          Templates
        </Title>
        <Text size="sm" c="dimmed">
          Select a template to start editing
        </Text>
      </div>

      {/* Scrollable Templates Container */}
      <ScrollArea 
        style={{ flex: 1 }} 
        px="md"
        pb="md"
        scrollbarSize={0}
      >
        {loading ? (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '200px' 
          }}>
            <Stack align="center" gap="md">
              <Loader size="md" />
              <Text size="sm" c="dimmed">Loading templates...</Text>
            </Stack>
          </div>
        ) : error ? (
          <Alert 
            icon={<AlertCircle size={16} />} 
            title="Error" 
            color="red"
            mb="md"
          >
            {error}
          </Alert>
        ) : (
          <Stack gap="md">
            {templates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={selectedTemplate === template.id}
                onSelect={handleSelectTemplate}
                loading={templateContentLoading && selectedTemplate === template.id}
              />
            ))}
          </Stack>
        )}
      </ScrollArea>

    </div>
  );
}