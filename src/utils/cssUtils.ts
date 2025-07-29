/**
 * Utility functions for CSS manipulation and parsing
 */

/**
 * Minify HTML by removing unnecessary whitespace
 */
export const minifyHtml = (html: string): string => {
  return html
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .replace(/\s+>/g, '>')
    .replace(/<\s+/g, '<')
    .trim();
};

/**
 * Minify CSS by removing unnecessary whitespace
 */
export const minifyCss = (css: string): string => {
  return css
    .replace(/\s+/g, ' ')
    .replace(/;\s+/g, ';')
    .replace(/{\s+/g, '{')
    .replace(/\s+}/g, '}')
    .replace(/:\s+/g, ':')
    .replace(/,\s+/g, ',')
    .trim();
};

/**
 * Parse numeric values from CSS strings
 */
export const parseNumericValue = (value: string | undefined, defaultValue: number = 0): number => {
  if (!value || value === 'auto' || value === 'none' || value === 'inherit') return defaultValue;
  const parsed = parseFloat(value.replace(/px|em|rem|%/g, ''));
  return isNaN(parsed) ? defaultValue : parsed;
};

/**
 * Get CSS property value with fallback
 */
export const getCSSValue = (styles: any, property: string, fallback: string = ''): string => {
  return styles[property] || fallback;
};

/**
 * Copy styles to clipboard
 */
export const copyStylesToClipboard = async (elementStyles: any, styleProperties: string[]): Promise<boolean> => {
  try {
    const styleEntries: string[] = [];
    
    styleProperties.forEach(property => {
      const value = elementStyles[property];
      if (value) {
        styleEntries.push(`${property}: ${value};`);
      }
    });
    
    const cssText = styleEntries.join('\n');
    await navigator.clipboard.writeText(cssText || 'No styles found');
    return true;
  } catch (error) {
    console.error('Failed to copy styles:', error);
    return false;
  }
};