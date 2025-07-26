import React, { useState, useEffect } from 'react';
import { Modal, Stack, Text, Button, Card, ScrollArea, Badge, SimpleGrid, Image } from '@mantine/core';
import { FileText, Calendar } from 'lucide-react';

interface SavedProject {
  name: string;
  html: string;
  css: string;
  savedAt: string;
  version: string;
  thumbnailUrl?: string;
}

interface SavedProjectsModalProps {
  opened: boolean;
  onClose: () => void;
  onProjectSelect: (project: SavedProject) => void;
}

export function SavedProjectsModal({ opened, onClose, onProjectSelect }: SavedProjectsModalProps) {
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]);

  useEffect(() => {
    if (opened) {
      // Load saved projects from localStorage
      const projects = JSON.parse(localStorage.getItem('saved_template_projects') || '[]');
      setSavedProjects(projects);
    }
  }, [opened]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Unknown date';
    }
  };

  const ProjectCard = ({ project }: { project: SavedProject }) => (
    <Card
      p="md"
      withBorder
      style={{ cursor: 'pointer', height: '100%' }}
      onClick={() => onProjectSelect(project)}
    >
      <Stack gap="sm">
        {/* Thumbnail */}
        <div
          style={{
            width: '100%',
            height: '120px',
            backgroundColor: 'var(--mantine-color-gray-1)',
            border: '1px solid var(--mantine-color-gray-3)',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          {project.thumbnailUrl ? (
            <Image
              src={project.thumbnailUrl}
              alt={`${project.name} thumbnail`}
              fit="cover"
              w="100%"
              h="100%"
            />
          ) : (
            <FileText size={32} color="var(--mantine-color-gray-5)" />
          )}
        </div>

        {/* Project Info */}
        <Stack gap="xs">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <Text fw={600} size="sm" style={{ flex: 1, minWidth: 0 }} truncate>
              {project.name}
            </Text>
            <Badge size="xs" variant="light" color="blue">
              v{project.version}
            </Badge>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calendar size={12} color="var(--mantine-color-gray-6)" />
            <Text size="xs" c="dimmed">
              {formatDate(project.savedAt)}
            </Text>
          </div>
        </Stack>
      </Stack>
    </Card>
  );

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Open Existing Project"
      size="xl"
      centered
    >
      <Stack gap="md">
        <Text size="sm" c="dimmed">
          Choose from your saved projects to continue editing
        </Text>

        {savedProjects.length === 0 ? (
          <Card p="xl" ta="center">
            <Stack align="center" gap="md">
              <FileText size={48} color="var(--mantine-color-gray-5)" />
              <Text c="dimmed">No saved projects found</Text>
              <Button variant="light" onClick={onClose}>
                Create New Project
              </Button>
            </Stack>
          </Card>
        ) : (
          <ScrollArea h={500}>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
              {savedProjects.map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))}
            </SimpleGrid>
          </ScrollArea>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
          <Button variant="subtle" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Stack>
    </Modal>
  );
}