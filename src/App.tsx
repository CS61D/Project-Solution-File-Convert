import { useState, useCallback } from "react";
import { Button } from "../src/components/ui/button";
import { useDropzone } from "react-dropzone";

function App() {
  const [file, setFile] = useState<ArrayBuffer | null>(null);

  const downloadFile = () => {
    if (!file) return;
    const blob = new Blob([file]);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "myfile.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      // Convert file to buffer
      console.log("loading file reader");
      const reader = new FileReader();
      reader.onerror = () => console.log("file reader error");
      reader.onload = () => {
        console.log("file loaded");
        const buffer = reader.result as ArrayBuffer;

        setFile(buffer);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <>
      <h1 className="">My Convert</h1>
      <p className="">An Online File Converter asdf</p>
      <Button onClick={downloadFile}>Convert</Button>
      <div className="border">
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        {file && <p>File loaded</p>}
      </div>
    </>
  );
}

export default App;
