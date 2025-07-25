// Theme customization for template editor
import { createTheme, rem } from '@mantine/core';

const theme = createTheme({
  colors: {
    primary: [
      '#f0f4ff',
      '#e0e7ff',
      '#c7d2fe',
      '#a5b4fc',
      '#818cf8',
      '#6366f1',
      '#4f46e5',
      '#4338ca',
      '#3730a3',
      '#312e81'
    ],
    gray: [
      '#f8fafc',
      '#f1f5f9',
      '#e2e8f0',
      '#cbd5e1',
      '#94a3b8',
      '#64748b',
      '#475569',
      '#334155',
      '#1e293b',
      '#0f172a'
    ]
  },
  primaryColor: 'primary',
  defaultRadius: 'md',
  fontFamily: 'Figtree, system-ui, sans-serif',
  headings: {
    fontFamily: 'Figtree, system-ui, sans-serif',
    fontWeight: '600'
  }
});

export default theme;