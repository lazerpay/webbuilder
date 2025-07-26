import React from 'react';
import { TextInput } from '@mantine/core';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "Search projects..." }: SearchBarProps) {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      leftSection={<Search size={16} />}
      size="md"
      style={{ flex: 1 }}
    />
  );
}