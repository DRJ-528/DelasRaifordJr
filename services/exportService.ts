import JSZip from 'jszip';

/**
 * Note: In this environment, we manually reference the project strings 
 * to ensure a perfect mirror of the current state.
 */
export const exportProjectAsZip = async () => {
  const zip = new JSZip();

  // Project Structure Definition
  const files = [
    { name: 'index.html', path: 'index.html' },
    { name: 'index.tsx', path: 'index.tsx' },
    { name: 'App.tsx', path: 'App.tsx' },
    { name: 'constants.tsx', path: 'constants.tsx' },
    { name: 'types.ts', path: 'types.ts' },
    { name: 'metadata.json', path: 'metadata.json' },
    { name: 'components/ThemePreview.tsx', path: 'components/ThemePreview.tsx' },
    { name: 'services/exportService.ts', path: 'services/exportService.ts' }
  ];

  // Fetch the contents of each file from the server/client context
  for (const file of files) {
    try {
      const response = await fetch(file.path);
      const content = await response.text();
      zip.file(file.name, content);
    } catch (err) {
      console.warn(`Could not include ${file.name} in bundle:`, err);
    }
  }

  // Generate the binary content
  const content = await zip.generateAsync({ type: 'blob' });

  // Trigger browser download
  const link = document.createElement('a');
  link.href = URL.createObjectURL(content);
  link.download = `delas-portfolio-redux-${new Date().toISOString().split('T')[0]}.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};