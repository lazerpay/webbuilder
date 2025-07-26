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
    secondary: [
      '#faf5ff',
      '#f3e8ff',
      '#e9d5ff',
      '#d8b4fe',
      '#c084fc',
      '#a855f7',
      '#9333ea',
      '#7c3aed',
      '#6d28d9',
      '#5b21b6'
    ],
    accent: [
      '#ecfeff',
      '#cffafe',
      '#a5f3fc',
      '#67e8f9',
      '#22d3ee',
      '#06b6d4',
      '#0891b2',
      '#0e7490',
      '#155e75',
      '#164e63'
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
    fontFamily: 'Space Grotesk, Figtree, system-ui, sans-serif',
    fontWeight: '600'
  }
});

export default theme;