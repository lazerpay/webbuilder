import React, { useState, useEffect } from 'react';
import { Stack, Group, Text, ActionIcon, Collapse } from '@mantine/core';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  disabled?: boolean;
}

export function CollapsibleSection({ 
  title, 
  icon, 
  children, 
  defaultOpen = false, 
  disabled = false 
}: CollapsibleSectionProps) {
  const [opened, setOpened] = useState(defaultOpen);

  // Update opened state when defaultOpen prop changes
  useEffect(() => {
    setOpened(defaultOpen);
  }, [defaultOpen]);

  return (
    <div style={{ 
      border: '1px solid var(--mantine-color-gray-3)', 
      borderRadius: '8px',
      marginBottom: '8px'
    }}>
      <Group 
        justify="space-between" 
        p="sm"
        style={{ 
          cursor: disabled ? 'default' : 'pointer',
          borderBottom: opened && !disabled ? '1px solid var(--mantine-color-gray-3)' : 'none'
        }}
        onClick={() => !disabled && setOpened(!opened)}
      >
        <Group gap="xs">
          {icon}
          <Text size="sm" fw={500} c={disabled ? 'dimmed' : 'dark'}>
            {title}
          </Text>
        </Group>
        <ActionIcon 
          variant="subtle" 
          size="sm"
          disabled={disabled}
        >
          {opened ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </ActionIcon>
      </Group>
      
      <Collapse in={opened && !disabled}>
        <div style={{ padding: '16px' }}>
          {children}
        </div>
      </Collapse>
    </div>
  );
}