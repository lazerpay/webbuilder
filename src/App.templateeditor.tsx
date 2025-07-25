import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { TemplateEditor } from './components/TemplateEditor/TemplateEditor';
import theme from './theme';

function App() {
  return (
    <MantineProvider theme={theme}>
      <div style={{ height: '100vh', overflow: 'hidden' }}>
        <TemplateEditor />
      </div>
    </MantineProvider>
  );
}

export default App;