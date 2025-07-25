// Enhanced zip utility using JSZip for proper folder structure
export const createZipAndDownload = async (files: { name: string; content: string }[], folderName: string = 'template') => {
  try {
    // Dynamically import JSZip
    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();
    
    // Create a folder
    const folder = zip.folder(folderName);
    
    if (!folder) {
      throw new Error('Failed to create folder in zip');
    }
    
    // Add files to the folder
    files.forEach(file => {
      folder.file(file.name, file.content);
    });
    
    // Generate the zip file
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    
    // Create download link
    const url = URL.createObjectURL(zipBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${folderName}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log(`Successfully downloaded ${folderName}.zip with ${files.length} files`);
  } catch (error) {
    console.error('Error creating zip with JSZip, falling back to individual downloads:', error);
    
    // Fallback to individual file downloads if JSZip fails
    for (const file of files) {
      const blob = new Blob([file.content], { 
        type: file.name.endsWith('.html') ? 'text/html' : 
              file.name.endsWith('.css') ? 'text/css' : 'text/plain'
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      // Small delay between downloads
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }
};