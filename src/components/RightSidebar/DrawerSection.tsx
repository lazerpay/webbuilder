import { useState } from 'react';
import { Paper, Group, Text, Collapse, ActionIcon } from '@mantine/core';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface DrawerSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  disabled?: boolean;
  headerActions?: React.ReactNode;
}

export function DrawerSection({ 
  title, 
  icon, 
  children, 
  isOpen, 
  onToggle, 
  disabled = false,
  headerActions 
}: DrawerSectionProps) {
  return (
    <Paper 
      withBorder 
      radius={0}
      style={{ 
        opacity: disabled ? 0.6 : 1,
        borderLeft: 'none',
        borderRight: 'none'
      }}
    >
      <Group
        justify="space-between"
        p="sm"
        style={{ 
          cursor: disabled ? 'not-allowed' : 'pointer',
          borderBottom: isOpen ? '1px solid var(--mantine-color-gray-3)' : 'none'
        }}
        onClick={() => !disabled && onToggle()}
      >
        <Group gap="xs">
          {icon}
          <Text size="sm" fw={500} c={disabled ? 'dimmed' : undefined}>
            {title}
          </Text>
        </Group>
        
        <Group gap="xs">
          {headerActions}
          <ActionIcon variant="subtle" size="sm" disabled={disabled}>
            {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </ActionIcon>
        </Group>
      </Group>
      
      <Collapse in={isOpen && !disabled}>
        <div style={{ maxHeight: isOpen ? '70vh' : 'auto', overflow: 'auto' }}>
          {children}
        </div>
      </Collapse>
    </Paper>
  );
}