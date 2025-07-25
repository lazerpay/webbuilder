import React, { useEffect } from 'react';
import { Code } from '@mantine/core';

interface PrismCodeBlockProps {
  code: string;
  language: 'html' | 'css';
  style?: React.CSSProperties;
}

export function PrismCodeBlock({ code, language, style }: PrismCodeBlockProps) {
  useEffect(() => {
    // Dynamically import Prism for syntax highlighting
    const loadPrism = async () => {
      try {
        const Prism = await import('prismjs');
        await import('prismjs/components/prism-markup');
        await import('prismjs/components/prism-css');
        await import('prismjs/themes/prism-tomorrow.css');
        
        // Highlight all code blocks
        Prism.highlightAll();
      } catch (error) {
        console.warn('Failed to load Prism.js:', error);
      }
    };

    loadPrism();
  }, [code, language]);

  const formatCode = (code: string, type: 'html' | 'css'): string => {
    if (!code) return type === 'html' ? '<!-- No HTML content -->' : '/* No CSS content */';
    
    try {
      // Enhanced formatting with better indentation
      if (type === 'html') {
        let formatted = code
          .replace(/></g, '>\n<')
          .replace(/^\s+|\s+$/g, '')
          .split('\n')
          .map((line, index, array) => {
            const trimmed = line.trim();
            if (!trimmed) return '';
            
            // Calculate indentation level
            let indent = 0;
            for (let i = 0; i < index; i++) {
              const prevLine = array[i].trim();
              if (prevLine.includes('<') && !prevLine.includes('</') && !prevLine.endsWith('/>')) {
                indent++;
              }
              if (prevLine.includes('</')) {
                indent--;
              }
            }
            
            // Adjust for closing tags
            if (trimmed.startsWith('</')) {
              indent--;
            }
            
            return '  '.repeat(Math.max(0, indent)) + trimmed;
          })
          .join('\n');
        
        return formatted;
      } else {
        // CSS formatting with proper indentation
        let formatted = code
          .replace(/\s*{\s*/g, ' {\n  ')
          .replace(/;\s*/g, ';\n  ')
          .replace(/\s*}\s*/g, '\n}\n')
          .replace(/,\s*/g, ',\n')
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0)
          .map(line => {
            if (line.endsWith('{')) {
              return line;
            } else if (line === '}') {
              return line;
            } else {
              return '  ' + line;
            }
          })
          .join('\n');
        
        return formatted;
      }
    } catch (error) {
      console.warn('Error formatting code:', error);
      // Fallback to basic formatting
      if (type === 'html') {
        return code.replace(/></g, '>\n<').replace(/^\s+|\s+$/g, '');
      } else {
        return code.replace(/;/g, ';\n').replace(/\{/g, ' {\n  ').replace(/\}/g, '\n}');
      }
    }
  };

  const formattedCode = formatCode(code, language);
  const prismLanguage = language === 'html' ? 'markup' : 'css';

  return (
    <div style={style}>
      <pre style={{ margin: 0, padding: '16px', borderRadius: '8px', overflow: 'auto' }}>
        <code className={`language-${prismLanguage}`}>
          {formattedCode}
        </code>
      </pre>
    </div>
  );
}