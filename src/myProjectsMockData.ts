// Mock data for My Projects page

export const mockRootProps = {
  initialProjects: [
    {
      name: "Landing Page Design",
      html: "<div><h1>Welcome to our service</h1><p>This is a landing page</p></div>",
      css: "h1 { color: #333; } p { color: #666; }",
      savedAt: "2024-01-15T10:30:00.000Z",
      version: "1.0",
      thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop"
    },
    {
      name: "Portfolio Website",
      html: "<div><header>Portfolio</header><main>My work showcase</main></div>",
      css: "header { background: #f0f0f0; } main { padding: 20px; }",
      savedAt: "2024-01-10T14:45:00.000Z", 
      version: "1.0",
      thumbnailUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=300&h=200&fit=crop"
    },
    {
      name: "E-commerce Product Page",
      html: "<div><div class='product'>Product details here</div></div>",
      css: ".product { border: 1px solid #ddd; padding: 15px; }",
      savedAt: "2024-01-08T09:15:00.000Z",
      version: "1.0", 
      thumbnailUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop"
    }
  ]
};