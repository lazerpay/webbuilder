import { useState, useEffect } from 'react';
import { Tabs, ScrollArea } from '@mantine/core';
import { useAppSelector } from '../../hooks/redux';
import { PrismCodeBlock } from './PrismCodeBlock';

interface CodeSectionProps {
  onDownload: () => void;
  onFullView: () => void;
}

// Utility function to format code using Prettier
const formatCode = async (code: string, parser: 'html' | 'css'): Promise<string> => {
  try {
    // Dynamically import Prettier
    const prettier = await import('prettier');
    const parserHtml = await import('prettier/parser-html');
    const parserCss = await import('prettier/parser-postcss');
    
    const formatted = await prettier.format(code, {
      parser: parser,
      plugins: [parserHtml, parserCss],
      printWidth: 80,
      tabWidth: 2,
      useTabs: false,
      semi: true,
      singleQuote: true,
      quoteProps: 'as-needed',
      trailingComma: 'es5',
      bracketSpacing: true,
      htmlWhitespaceSensitivity: 'css',
    });
    
    return formatted;
  } catch (error) {
    console.warn('Failed to format code with Prettier:', error);
    return code; // Return original code if formatting fails
  }
};

export function CodeSection({ onDownload, onFullView }: CodeSectionProps) {
  const { editorContent } = useAppSelector((state) => state.template);
  const [activeTab, setActiveTab] = useState<string>('html');
  const [formattedHtml, setFormattedHtml] = useState<string>('');
  const [formattedCss, setFormattedCss] = useState<string>('');

  // Format code when content changes
  useEffect(() => {
    const formatHtml = async () => {
      if (editorContent.bodyContent) {
        const formatted = await formatCode(editorContent.bodyContent, 'html');
        setFormattedHtml(formatted);
      }
    };

    const formatCss = async () => {
      if (editorContent.css) {
        const formatted = await formatCode(editorContent.css, 'css');
        setFormattedCss(formatted);
      }
    };

    formatHtml();
    formatCss();
  }, [editorContent.bodyContent, editorContent.css]);

  return (
    <div style={{ padding: '16px' }}>
      <Tabs value={activeTab} onChange={(value) => setActiveTab(value || 'html')}>
        <Tabs.List>
          <Tabs.Tab value="html">HTML</Tabs.Tab>
          <Tabs.Tab value="css">CSS</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="html" pt="md">
          <ScrollArea style={{ maxHeight: '400px' }} scrollbarSize={6}>
            <PrismCodeBlock
              code={formattedHtml || editorContent.bodyContent}
              language="html"
            />
          </ScrollArea>
        </Tabs.Panel>

        <Tabs.Panel value="css" pt="md">
          <ScrollArea style={{ maxHeight: '400px' }} scrollbarSize={6}>
            <PrismCodeBlock
              code={formattedCss || editorContent.css}
              language="css"
            />
          </ScrollArea>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}