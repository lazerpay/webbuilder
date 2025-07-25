import React from 'react';
import { Group, Select, Text } from '@mantine/core';

interface FlexControlsProps {
  values: {
    direction: string;
    alignItems: string;
    justifyContent: string;
  };
  onChange: (property: string, value: string | number) => void;
}

export function FlexControls({ values, onChange }: FlexControlsProps) {
  return (
    <>
      <Text size="xs" fw={500} mb="xs">Flex Layout</Text>
      <Select
        label="Direction"
        size="xs"
        value={values.direction}
        onChange={(value) => onChange('flex-direction', value || 'row')}
        data={[
          { value: 'row', label: 'Row' },
          { value: 'column', label: 'Column' },
          { value: 'row-reverse', label: 'Row Reverse' },
          { value: 'column-reverse', label: 'Column Reverse' }
        ]}
      />
      <Group gap="xs">
        <Select
          label="Align Items"
          size="xs"
          value={values.alignItems}
          onChange={(value) => onChange('align-items', value || 'stretch')}
          data={[
            { value: 'stretch', label: 'Stretch' },
            { value: 'flex-start', label: 'Start' },
            { value: 'center', label: 'Center' },
            { value: 'flex-end', label: 'End' }
          ]}
          style={{ flex: 1 }}
        />
        <Select
          label="Justify Content"
          size="xs"
          value={values.justifyContent}
          onChange={(value) => onChange('justify-content', value || 'flex-start')}
          data={[
            { value: 'flex-start', label: 'Start' },
            { value: 'center', label: 'Center' },
            { value: 'flex-end', label: 'End' },
            { value: 'space-between', label: 'Space Between' },
            { value: 'space-around', label: 'Space Around' }
          ]}
          style={{ flex: 1 }}
        />
      </Group>
    </>
  );
}