import React from 'react';
import { Select } from '@mantine/core';

interface BoxShadowControlsProps {
  value: string;
  onChange: (property: string, value: string | number) => void;
}

export function BoxShadowControls({ value, onChange }: BoxShadowControlsProps) {
  return (
    <Select
      label="Box Shadow"
      size="xs"
      value={value}
      onChange={(val) => onChange('box-shadow', val || 'none')}
      data={[
        { value: 'none', label: 'None' },
        { value: '0 1px 3px rgba(0,0,0,0.12)', label: 'Small' },
        { value: '0 4px 6px rgba(0,0,0,0.1)', label: 'Medium' },
        { value: '0 10px 25px rgba(0,0,0,0.15)', label: 'Large' },
        { value: '0 20px 40px rgba(0,0,0,0.2)', label: 'Extra Large' }
      ]}
    />
  );
}