import logo from './logo.svg';
import './App.css';
import { showOpenFilePicker } from 'native-file-system-adapter';
import { React, useState } from 'react';
import { PythonProvider, usePython } from 'react-py';

/*
Minimal example of running a local Python file in the browser
using the native-file-system-adapter ponyfill of the File System Access API and react-py
*/

function App() {
  const [fileHandle, setFileHandle] = useState()
  const [fileContents, setFileContents] = useState('')

  const { runPython, stdout, stderr, isLoading, isRunning } = usePython();

  return (
    <PythonProvider>
    <div id="app" className="App">
      <h1>Python In Browser Demo</h1>
      <button onClick={async () => {
        let unwrappedFileHandle;
        [unwrappedFileHandle] = await showOpenFilePicker();
        setFileHandle(unwrappedFileHandle);
        const file = await unwrappedFileHandle.getFile();
        setFileContents(await file.text());
      }}>Load File</button>
      <p>
      <textarea 
        type="text"
        readOnly={true}
        value={fileContents}
        rows={10}
        cols={60}
      />
      </p>
        <button onClick={() => {
          runPython(fileContents);
        }}>Run Script</button>
      <p>Output</p>
      <pre>
        <code>{stdout}</code>
      </pre>
      <p>Error</p>
      <pre>
        <code>{stderr}</code>
      </pre>
    </div>
    </PythonProvider>
  );
}

export default App;
