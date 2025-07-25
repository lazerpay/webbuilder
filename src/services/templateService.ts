export interface Template {
  id: string;
  name: string;
  description: string;
  htmlUrl: string;
  cssUrl: string;
  thumbnailUrl: string;
}

export interface TemplateContent {
  html: string;
  bodyContent: string;
  css: string;
}

const TEMPLATES_API_URL = 'https://raw.githubusercontent.com/lazerpay/webbuilder-templates/main/index.json';

export const templateService = {
  async fetchTemplates(): Promise<Template[]> {
    try {
      const response = await fetch(TEMPLATES_API_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch templates: ${response.statusText}`);
      }
      const templates = await response.json();
      return templates;
    } catch (error) {
      console.error('Error fetching templates:', error);
      throw error;
    }
  },

  async fetchTemplateContent(template: Template): Promise<TemplateContent> {
    try {
      // Fetch HTML content
      const htmlResponse = await fetch(template.htmlUrl);
      if (!htmlResponse.ok) {
        throw new Error(`Failed to fetch HTML: ${htmlResponse.statusText}`);
      }
      const html = await htmlResponse.text();

      // Extract body content
      const bodyContent = this.extractBodyContent(html);

      // Fetch CSS file
      let css = '';
      if (template.cssUrl) {
        const cssResponse = await fetch(template.cssUrl);
        if (!cssResponse.ok) {
          console.warn(`Failed to fetch CSS from ${template.cssUrl}: ${cssResponse.statusText}`);
        } else {
          css = await cssResponse.text();
        }
      }

      return { html, bodyContent, css };
    } catch (error) {
      console.error('Error fetching template content:', error);
      throw error;
    }
  },

  extractBodyContent(html: string): string {
    try {
      // Create a temporary DOM parser
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // Extract body content
      const body = doc.querySelector('body');
      if (body) {
        return body.innerHTML;
      }
      
      // Fallback: if no body tag found, return the original HTML
      return html;
    } catch (error) {
      console.warn('Error extracting body content:', error);
      return html;
    }
  }
};