import { useState, useCallback } from "react";
import { Button } from "../src/components/ui/button";

import { useDropzone } from "react-dropzone";
import { ImageMimeTypes } from "./lib/constants";
import "./App.css";
import { FileView } from "./components/FileView";

function App() {
  // Store the files in state to persist them when new files are added
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((files) => [...files, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: ImageMimeTypes,
    onDrop,
  });
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-3xl p-2">Quick Convert</h1>
      <p className="pb-5">An Online Image Format Converter</p>
      <div className="flex justify-center items-center w-96 h-64 border-2 border-dashed border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out p-2">
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div className="text-center">
            <p className="text-gray-500 text-xl">
              Drag & drop an images here, or click to select files
            </p>
            <p className="text-gray-500 text-l">
              Supported formats: png, jpeg, bmp, ico, tiff, gif, heic
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-2 justify-center items-center pt-3">
        {files.length > 0 && (
          <Button onClick={() => setFiles([])}>Discard All</Button>
        )}
        {files.map((file) => (
          <FileView
            key={file.name}
            file={file}
            // Todo revoke object url
            onDiscard={() => setFiles(files.filter((f) => f !== file))}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
