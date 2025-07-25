//import enums.ts if any

// Data for global state store
export const mockStore = {
  selectedTemplate: null as string | null,
  templates: [
    {
      id: "template-1" as const,
      name: "Landing Page",
      description: "Modern landing page template",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
      htmlContent: "<div><h1>Welcome</h1><p>This is a landing page template</p></div>",
      cssContent: "h1 { color: #333; font-size: 2rem; } p { color: #666; }"
    },
    {
      id: "template-2" as const,
      name: "Portfolio",
      description: "Creative portfolio template",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
      htmlContent: "<div><h1>Portfolio</h1><div class='gallery'><div class='item'>Project 1</div></div></div>",
      cssContent: "h1 { color: #2c3e50; } .gallery { display: grid; gap: 1rem; } .item { padding: 1rem; background: #f8f9fa; }"
    },
    {
      id: "template-3" as const,
      name: "Blog",
      description: "Clean blog template",
      thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop",
      htmlContent: "<div><h1>Blog</h1><article><h2>Article Title</h2><p>Article content...</p></article></div>",
      cssContent: "h1 { color: #1a202c; } article { margin: 2rem 0; } h2 { color: #2d3748; }"
    }
  ],
  editorContent: {
    html: "",
    css: ""
  }
};

// Data returned by API queries
export const mockQuery = {};

// Data passed as props to the root component
export const mockRootProps = {};

// Types
export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  htmlContent: string;
  cssContent: string;
}